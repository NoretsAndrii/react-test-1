import "./App.css";
import UsersTable from "../UsersTable/UsersTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersDataLarge,
  fetchUsersDataSmall,
} from "../../redux/userDataOps";
import {
  selectIsError,
  selectIsLoading,
  selectUsersData,
} from "../../redux/usersDataSlice";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const users = useSelector(selectUsersData);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const selectValue = form.elements.select.value;

    const getData = async () => {
      try {
        if (selectValue === "small") {
          dispatch(fetchUsersDataSmall());
        } else {
          dispatch(fetchUsersDataLarge());
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="select">Выберите обьем данных</label>
        <select name="select" id="select">
          <option value="small">small</option>
          <option value="large">large</option>
        </select>
        <button type="submit">Download</button>
      </form>
      {isLoading && <Loader />}
      {users.length !== 0 && !isLoading && <UsersTable />}
      {isError && !isLoading && <ErrorMessage />}
    </>
  );
}

import { useDispatch } from "react-redux";
import {
  fetchUsersDataLarge,
  fetchUsersDataSmall,
} from "../../redux/userDataOps";

export default function Form() {
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="select">Выберите обьем данных</label>
      <select name="select" id="select">
        <option value="small">small</option>
        <option value="large">large</option>
      </select>
      <button type="submit">Download</button>
    </form>
  );
}

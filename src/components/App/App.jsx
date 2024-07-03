import "./App.css";
import UsersTable from "../UsersTable/UsersTable";
import { useSelector } from "react-redux";
import {
  selectIsError,
  selectIsLoading,
  selectUsersData,
} from "../../redux/usersDataSlice";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Form from "../Form/Form";

export default function App() {
  const users = useSelector(selectUsersData);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  return (
    <>
      <Form />
      {isLoading && <Loader />}
      {users.length !== 0 && !isLoading && <UsersTable />}
      {isError && !isLoading && <ErrorMessage />}
    </>
  );
}

import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredUsersData } from "../redux/usersDataSlice";
import { selectTypeSettings, setFilter, setType } from "../redux/filtersSlice";

export default function UsersTable() {
  const users = useSelector(selectFilteredUsersData);
  const isSorted = useSelector(selectTypeSettings);
  const dispatch = useDispatch();

  const handleClick = (type) => {
    dispatch(setType(type));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = form.elements.search.value.trim();
    dispatch(setFilter(value));
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </form>
      <div>UsersTable</div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleClick("id")}>
              Id {isSorted.id ? <FaAngleUp /> : <FaAngleDown />}
            </th>
            <th onClick={() => handleClick("firstName")}>
              firstName {isSorted.firstName ? <FaAngleUp /> : <FaAngleDown />}
            </th>
            <th onClick={() => handleClick("lastName")}>
              lastName {isSorted.lastName ? <FaAngleUp /> : <FaAngleDown />}
            </th>
            <th onClick={() => handleClick("email")}>
              email {isSorted.email ? <FaAngleUp /> : <FaAngleDown />}
            </th>
            <th onClick={() => handleClick("phone")}>
              phone {isSorted.phone ? <FaAngleUp /> : <FaAngleDown />}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.phone}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

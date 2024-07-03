import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";

import {
  selectFilteredUsersData,
  selectUserInfo,
  setUserInfo,
} from "../redux/usersDataSlice";
import {
  selectCurrentPage,
  selectTypeSettings,
  setCurrentPage,
  setFilter,
  setType,
} from "../redux/filtersSlice";
import UserInfo from "../UserInfo/UserInfo";

const itemsPerPage = 50;

export default function UsersTable() {
  const currentPage = useSelector(selectCurrentPage);
  const users = useSelector(selectFilteredUsersData);
  const isSorted = useSelector(selectTypeSettings);
  const userInfo = useSelector(selectUserInfo);
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

  const handleChangePage = (e, newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleOnUserClick = (user) => {
    dispatch(setUserInfo(user));
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
          {currentItems.map((user) => {
            return (
              <tr key={user.phone} onClick={() => handleOnUserClick(user)}>
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

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
        />
      )}
      {userInfo && <UserInfo />}
    </>
  );
}

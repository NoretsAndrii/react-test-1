import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import css from "./UsersTable.module.css";

import {
  selectFilteredUsersData,
  selectUserInfo,
  setUserInfo,
} from "../../redux/usersDataSlice";
import {
  selectCurrentPage,
  selectTypeSettings,
  setCurrentPage,
  setType,
} from "../../redux/filtersSlice";
import UserInfo from "../UserInfo/UserInfo";
import SearchForm from "../SearchForm/SearchForm";

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
      <SearchForm />
      <h3>UsersTable</h3>
      <table className={css.table}>
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
                <td style={{ width: "50px" }}>{user.id}</td>
                <td style={{ width: "140px" }}>{user.firstName}</td>
                <td style={{ width: "140px" }}>{user.lastName}</td>
                <td style={{ width: "230px" }}>{user.email}</td>
                <td style={{ width: "150px" }}>{user.phone}</td>
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
          sx={{
            marginBottom: "24px",
            "& .MuiPagination-ul": { justifyContent: "center" },
          }}
        />
      )}
      {userInfo && <UserInfo />}
    </>
  );
}

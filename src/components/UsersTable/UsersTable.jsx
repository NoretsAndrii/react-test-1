import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

export default function UsersTable({ usersData }) {
  const [isSorted, setIsSorted] = useState({
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
  });
  const [users, setUsers] = useState(usersData);

  const handleClick = (type) => {
    if (type === "id") {
      if (isSorted[type]) {
        setIsSorted((prev) => {
          return { ...prev, [type]: false };
        });
        setUsers(usersData.toSorted((a, b) => b[type] - a[type]));
      } else {
        setIsSorted((prev) => {
          return { ...prev, [type]: true };
        });
        setUsers(usersData.toSorted((a, b) => a[type] - b[type]));
      }
    }
    if (type === "firstName" || type === "lastName" || type === "email") {
      if (isSorted[type]) {
        setIsSorted((prev) => {
          return { ...prev, [type]: false };
        });
        setUsers(usersData.toSorted((a, b) => a[type].localeCompare(b[type])));
      } else {
        setIsSorted((prev) => {
          return { ...prev, [type]: true };
        });
        setUsers(usersData.toSorted((a, b) => b[type].localeCompare(a[type])));
      }
    }
    if (type === "phone") {
      if (!isSorted[type]) {
        setIsSorted((prev) => {
          return { ...prev, [type]: true };
        });
        setUsers(
          usersData.toSorted((a, b) => {
            const cleanA = a[type].replace(/[^\d]/g, "");
            const cleanB = b[type].replace(/[^\d]/g, "");
            return cleanA.localeCompare(cleanB);
          })
        );
      } else {
        setIsSorted((prev) => {
          return { ...prev, [type]: false };
        });
        setUsers(
          usersData.toSorted((a, b) => {
            const cleanA = a[type].replace(/[^\d]/g, "");
            const cleanB = b[type].replace(/[^\d]/g, "");
            return cleanB.localeCompare(cleanA);
          })
        );
      }
    }
  };

  return (
    <>
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

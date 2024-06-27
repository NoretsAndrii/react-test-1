import { useState } from "react";

import "./App.css";
import axios from "axios";
import UsersTable from "../UsersTable/UsersTable";

const fetchSmallData = async () => {
  const response = await axios.get(
    " http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
  );
  console.log(response.data);
  return response.data;
};

const fetchLargeData = async () => {
  const response = await axios.get(
    " http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
  );
  console.log(response.data);
  return response.data;
};

export default function App() {
  const [usersData, setUsersData] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const selectValue = form.elements.select.value;

    const getData = async () => {
      try {
        if (selectValue === "small") {
          const data = await fetchSmallData();
          setUsersData(data);
        } else {
          const data = await fetchLargeData();
          setUsersData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }

  let users = usersData.toSorted((a, b) => a.id - b.id);

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
      {usersData.length !== 0 && <UsersTable usersData={users} />}
    </>
  );
}

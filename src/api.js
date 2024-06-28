import axios from "axios";

export const fetchSmallData = async () => {
  const response = await axios.get(
    " http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
  );
  console.log(response.data);
  return response.data;
};

export const fetchLargeData = async () => {
  const response = await axios.get(
    " http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
  );
  console.log(response.data);
  return response.data;
};

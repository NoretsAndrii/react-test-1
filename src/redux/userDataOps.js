import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsersDataSmall = createAsyncThunk(
  "users/fetchSmall",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        " http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchUsersDataLarge = createAsyncThunk(
  "users/fetchLarge",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        " http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

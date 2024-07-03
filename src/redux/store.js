import { configureStore } from "@reduxjs/toolkit";
import { userDataReducer } from "./usersDataSlice";
import { filtersReducer } from "./filtersSlice";

export const store = configureStore({
  reducer: {
    users: userDataReducer,
    filters: filtersReducer,
  },
});

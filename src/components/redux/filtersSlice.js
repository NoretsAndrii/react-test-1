import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersDataLarge, fetchUsersDataSmall } from "./userDataOps";

const initialState = {
  search: "",
  type: "id",
  typeSettings: {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setFilter(state, action) {
      state.search = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
      state.typeSettings[action.payload] = !state.typeSettings[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersDataSmall.fulfilled, (state) => {
        state.search = "";
        state.type = "id";
        state.typeSettings = {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        };
      })
      .addCase(fetchUsersDataLarge.fulfilled, (state) => {
        state.search = "";
        state.type = "id";
        state.typeSettings = {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        };
      });
  },
});

export const filtersReducer = filtersSlice.reducer;

export const { setFilter, setType } = filtersSlice.actions;

export const selectSearch = (state) => state.filters.search;
export const selectType = (state) => state.filters.type;
export const selectTypeSettings = (state) => state.filters.typeSettings;

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
  currentPage: 1,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setFilter(state, action) {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setType(state, action) {
      state.type = action.payload;
      state.typeSettings[action.payload] = !state.typeSettings[action.payload];
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
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
        state.currentPage = 1;
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
        state.currentPage = 1;
      });
  },
});

export const filtersReducer = filtersSlice.reducer;

export const { setFilter, setType, setCurrentPage } = filtersSlice.actions;

export const selectSearch = (state) => state.filters.search;
export const selectType = (state) => state.filters.type;
export const selectTypeSettings = (state) => state.filters.typeSettings;
export const selectCurrentPage = (state) => state.filters.currentPage;

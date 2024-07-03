import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchUsersDataLarge, fetchUsersDataSmall } from "./userDataOps";
import { selectSearch, selectType, selectTypeSettings } from "./filtersSlice";

const handlePending = (state) => {
  state.items = [];
  state.userInfo = null;
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isError = action.payload;
};

const usersDataSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    userInfo: null,
    isLoading: false,
    isError: false,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersDataSmall.pending, handlePending)
      .addCase(fetchUsersDataSmall.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.items = action.payload;
      })
      .addCase(fetchUsersDataSmall.rejected, handleRejected)
      .addCase(fetchUsersDataLarge.pending, handlePending)
      .addCase(fetchUsersDataLarge.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.items = action.payload;
      })
      .addCase(fetchUsersDataLarge.rejected, handleRejected);
  },
});

export const userDataReducer = usersDataSlice.reducer;

export const { setUserInfo } = usersDataSlice.actions;

export const selectUsersData = (state) => state.users.items;
export const selectUserInfo = (state) => state.users.userInfo;
export const selectIsLoading = (state) => state.users.isLoading;
export const selectIsError = (state) => state.users.isError;

export const selectFilteredUsers = createSelector(
  [selectUsersData, selectSearch],
  (users, value) => {
    const filteredUsersData = users.filter((user) => {
      for (const key in user) {
        if (user[key].toString().toLowerCase().includes(value.toLowerCase()))
          return true;
      }
      return false;
    });
    return filteredUsersData;
  }
);

export const selectFilteredUsersData = createSelector(
  [selectFilteredUsers, selectType, selectTypeSettings],
  (users, type, isSorted) => {
    if (type === "id") {
      if (!isSorted[type]) {
        return users.toSorted((a, b) => b[type] - a[type]);
      } else {
        return users.toSorted((a, b) => a[type] - b[type]);
      }
    }
    if (type === "firstName" || type === "lastName" || type === "email") {
      if (isSorted[type]) {
        return users.toSorted((a, b) => a[type].localeCompare(b[type]));
      } else {
        return users.toSorted((a, b) => b[type].localeCompare(a[type]));
      }
    }
    if (type === "phone") {
      if (!isSorted[type]) {
        return users.toSorted((a, b) => {
          const cleanA = a[type].replace(/[^\d]/g, "");
          const cleanB = b[type].replace(/[^\d]/g, "");
          return cleanA.localeCompare(cleanB);
        });
      } else {
        return users.toSorted((a, b) => {
          const cleanA = a[type].replace(/[^\d]/g, "");
          const cleanB = b[type].replace(/[^\d]/g, "");
          return cleanB.localeCompare(cleanA);
        });
      }
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./fetchUser";

const initialState = {
  user: null,
  token: localStorage.getItem("authToken") ? localStorage.getItem("authToken") : null,
  dataLoading: false,
  errorMessage: null,
};

export const fetchUserInfoAsync = (address) => async (dispatch) => {
  const res = await fetchUser(address);
  dispatch(setUser(res));
};

export const itemSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    loggedIn: (state, action) => {
      state.token = action.payload;
      state.dataLoading = false;
    },
    loggedOut: (state, action) => {
      state.user = "";
      state.token = null;
    },
    removeToken: (state, action) => {
      state.token = null;
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
      state.dataLoading = false;
    },
    setLoading: (state, action) => {
      state.dataLoading = action.payload;
    },
  },
});

export const { setUser, loggedIn, loggedOut, removeToken, setError, setLoading } = itemSlice.actions;

export default itemSlice.reducer;

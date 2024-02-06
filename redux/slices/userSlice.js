import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    success: false,
    userDetails: null,
  },
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userDetails = action.payload;
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());

    // Make API call to register user
    const response = await axios.post(
      "https://bookpedia-backend.vercel.app/users/register",
      userData
    );

    // Registration successful
    dispatch(registerSuccess());
  } catch (error) {
    // Registration failed
    dispatch(registerFailure(error.response.data.message));
  }
};

export const loginUser = (userData) => async (dispatch, getState) => {
  try {
    dispatch(loginStart());
    const response = await axios.post(
      "https://bookpedia-backend.vercel.app/users/login",
      userData
    );
    const userDetails = response.data;
    dispatch(loginSuccess(userDetails));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));

    const isLoggedIn = getState().user.success;
    if (!isLoggedIn) {
      // Redirect to login page after login failure
      if (typeof window !== "undefined") {
        router.push("/login");
      }
    }
  }
};

export default userSlice.reducer;
export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
} = userSlice.actions;

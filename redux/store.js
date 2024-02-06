import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slices/userSlice";
import bookReducer from "../redux/slices/bookSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
  },
});

export default store;

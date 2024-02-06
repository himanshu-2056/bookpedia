import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    cart: [],
    loading: false,
    error: null,
    success: false,
    singleBook: null,
  },
  reducers: {
    bookregisterStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    bookregisterSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    bookregisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getBookStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBookSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    getBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSingleBookStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSingleBookSuccess: (state, action) => {
      state.loading = false;
      state.singleBook = action.payload;
    },
    getSingleBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToCart: (state, action) => {
      const bookId = action.payload;
      const existingBook = state.cart.find((item) => item._id === bookId);

      if (existingBook) {
        existingBook.quantity = existingBook.quantity + 1;
      } else {
        const book = state.books.find((item) => item._id === bookId);
        if (book) {
          state.cart.push({ ...book, quantity: 1 });
        }
      }
    },

    removeFromCart: (state, action) => {
      const bookId = action.payload;
      state.cart = state.cart.filter((item) => item._id !== bookId);
    },

    decrementCartItem: (state, action) => {
      const { payload: bookId } = action;
      const cartItem = state.cart.find((item) => item._id === bookId);

      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        // Use the dispatch function passed as a parameter
        state.cart = state.cart.filter((item) => item._id !== bookId);
      }
    },

    incrementCartItem: (state, action) => {
      const bookId = action.payload;
      const cartItem = state.cart.find((item) => item._id === bookId);

      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        const book = state.books.find((item) => item._id === bookId);
        if (book) {
          state.cart.push({ ...book, quantity: 1 });
        }
      }
    },
  },
});

export const registerBook = (userData) => async (dispatch) => {
  try {
    dispatch(bookregisterStart());

    const response = await axios.post(
      "https://legacylibrary-backend.vercel.app/books/bookcreate",
      userData
    );

    dispatch(bookregisterSuccess());
  } catch (error) {
    dispatch(bookregisterFailure(error.response.data.message));
  }
};

export const getBook = () => async (dispatch) => {
  try {
    dispatch(getBookStart());
    const response = await axios.get(
      "https://legacylibrary-backend.vercel.app/books/getbook"
    );
    dispatch(getBookSuccess(response.data));
  } catch (error) {
    dispatch(getBookFailure(error.response.data.message));
  }
};

export const getSingleBook = (bookId) => async (dispatch) => {
  try {
    dispatch(getSingleBookStart());
    const response = await axios.get(
      `http://localhost:000/books/book/${bookId}`
    );
    dispatch(getSingleBookSuccess(response.data));
  } catch (error) {
    dispatch(getSingleBookFailure(error.response.data.message));
  }
};

export default bookSlice.reducer;
export const {
  bookregisterStart,
  bookregisterSuccess,
  bookregisterFailure,
  getBookStart,
  getBookSuccess,
  getBookFailure,
  getSingleBookStart,
  getSingleBookSuccess,
  getSingleBookFailure,
  addToCart,
  removeFromCart,
  decrementCartItem,
  incrementCartItem,
} = bookSlice.actions;

/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/common/Layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  addToCart,
  decrementCartItem,
  getSingleBook,
  incrementCartItem,
  removeFromCart,
} from "@/redux/slices/bookSlice";

const BookDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const book = useSelector((state) => state.book.singleBook);
  const cart = useSelector((state) => state.book.cart);

  const handleAddToCart = () => {
    dispatch(addToCart(book._id));
  };

  useEffect(() => {
    if (id) {
      dispatch(getSingleBook(id));
    }
  }, [id, dispatch]);

  const handleRemoveFromCart = (bookId) => {
    dispatch(removeFromCart(bookId));
  };
  const handleDecrementCartItem = (bookId) => {
    dispatch(decrementCartItem(bookId));
  };

  const handleIncrementCartItem = (bookId) => {
    dispatch(incrementCartItem(bookId));
  };

  const getCartItemQuantity = (bookId) => {
    const cartItem = cart.find((item) => item._id === bookId);
    return cartItem ? cartItem.quantity : 0;
  };
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-5 my-20">
        <div className="grid md:grid-cols-3 gap-10">
          <img
            className="w-full object-cover scale-100 h-[600px] custom-shadow"
            src={book?.image}
            alt={book?.name}
          />
          <div className="md:col-span-2 space-y-5 flex flex-col">
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold tracking-wide">
                {book?.name}
              </h1>
              <p
                className="text-gray-500 text-sm"
                dangerouslySetInnerHTML={{ __html: book?.description }}
              ></p>
              <p className="text-gray-700 font-semibold text-xl">
                Author: {book?.author}
              </p>

              <div className="flex gap-x-2 h-[36px] text-sm">
                <div className="flex flex-1 max-w-[100px]  items-center h-full border text-primary font-medium">
                  <div className="flex-1 h-full flex justify-center items-center cursor-pointer">
                    <AiOutlineMinus
                      onClick={() => handleDecrementCartItem(book?._id)}
                    />
                  </div>
                  <div className="h-full flex-1 flex justify-center items-center">
                    <div>
                      <p>{getCartItemQuantity(book?._id)}</p>
                      <hr />
                    </div>
                  </div>
                  <div className="flex-1 h-full flex justify-center items-center cursor-pointer">
                    <AiOutlinePlus
                      onClick={() => handleIncrementCartItem(book?._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-red-500 rounded-xl w-fit px-10 py-2 text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetails;

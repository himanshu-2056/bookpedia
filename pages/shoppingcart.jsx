/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/common/Layout";
import {
  addToCart,
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
} from "@/redux/slices/bookSlice";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.book.cart);

  const handleRemoveFromCart = (bookId) => {
    dispatch(removeFromCart(bookId));
  };
  const handleDecrementCartItem = (bookId) => {
    dispatch(decrementCartItem(bookId));
  };

  const handleIncrementCartItem = (bookId) => {
    dispatch(incrementCartItem(bookId));
  };

  return (
    <Layout>
      <div className="max-w-7xl px-8 mx-auto my-10">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p className="text-4xl text-center text-red-500">
            Your Cart is Empty
          </p>
        ) : (
          ""
        )}
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row md:items-center justify-between bg-gray-100 rounded-lg p-4 mb-2 "
          >
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={item?.image}
                alt={item?.name}
                className="w-32 h-32 mr-4 object-cover"
              />
              <div>
                <h2 className="text-lg font-bold">{item?.name}</h2>
                <p className="text-gray-500 capitalize">{item?.category}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <button
                  onClick={() => handleDecrementCartItem(item?._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-l"
                >
                  <AiOutlineMinus className="h-4 w-4" />
                </button>
                <span className="bg-gray-200 md:flex-1 text-center px-2">
                  {item?.quantity}
                </span>
                <button
                  onClick={() => handleIncrementCartItem(item?._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-r"
                >
                  <AiOutlinePlus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex md:items-center justify-between space-x-5">
                <p className="text-gray-500">${item?.price}</p>
                <button
                  onClick={() => handleRemoveFromCart(item?._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="my-5 flex justify-end">
          <button className="border p-3 bg-yellow-500 text-white rounded-md custom-shadow">
            Place Order
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default ShoppingCart;

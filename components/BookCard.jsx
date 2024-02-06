/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decrementCartItem,
  incrementCartItem,
} from "@/redux/slices/bookSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(book._id));
  };

  return (
    <div
      key={book?.id}
      className="group relative  p-4 sm:p-6 custom-shadow rounded-2xl"
    >
      <Link href={`/books/${book?._id}`}>
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
          <img
            src={book?.image}
            alt={book?.imageAlt}
            className="h-fit w-full object-cover object-center"
          />
        </div>
      </Link>
      <div className="pb-4 pt-5 text-center space-y-3">
        <h3 className="text-lg font-medium text-gray-900">
          <Link href={`/books/${book?._id}`}>
            <span />
            {book?.name}
          </Link>
        </h3>

        <p className="text-sm text-gray-400">
          <span>Category : </span>
          {book?.category}
        </p>

        <p className="text-sm text-gray-400">
          <span>Author : </span>
          {book?.author}
        </p>
        <p className="text-xl font-medium text-gray-900">
          <span>Price : </span>
          {book?.price}
        </p>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-red-500 rounded-xl w-full py-2 text-white cursor-pointer custom-shadow "
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;

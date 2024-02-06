import Layout from "@/components/common/Layout";
import React, { useEffect } from "react";
import { books } from "../api/data";
import BookCard from "@/components/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "@/redux/slices/bookSlice";

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);
  console.log(books);

  useEffect(() => {
    dispatch(getBook());
  }, []);
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-5 space-y-10 my-10">
        <div className="h-[200px] bg-indigo-500 flex items-center justify-center rounded-xl custom-shadow">
          <h1 className="text-5xl text-white font-semibold ">All Books</h1>
        </div>
        <div className="my-10 grid grid-cols-1  sm:mx-0 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Books;

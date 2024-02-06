/* eslint-disable @next/next/no-img-element */
import Banner from "@/components/Banner";
import Layout from "@/components/common/Layout";
import React, { useEffect } from "react";
import BookCard from "@/components/BookCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import AdvertisementBanner from "@/components/AdvertisementBanner";
import { getBook } from "@/redux/slices/bookSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books);

  useEffect(() => {
    dispatch(getBook());
  }, []);

  return (
    <Layout>
      <main>
        {/* advertisement section*/}
        <AdvertisementBanner />

        {/* Main Banner */}
        <Banner />

        {/* Book Section */}
        <section>
          <div className="max-w-7xl mx-auto px-5">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-semibold">Buy Books</h1>
              <Link
                href={"/books"}
                className="text-lg text-gray-500  py-3 flex items-center gap-2"
              >
                <span>Show All</span>
                <AiOutlineArrowRight />
              </Link>
            </div>

            <div className="my-10 grid grid-cols-1  sm:mx-0 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {books.map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const AdvertisementBanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 my-8">
      <div className=" relative bg-gray-100 py-8">
        <img
          src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2019/09/23165047/Importance-of-Books.jpg"
          alt="Advertisement Banner"
          className="absolute inset-0 object-cover w-full h-full  rounded-xl"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center relative">
            <div className="text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Special Offer!</h2>
              <p className="text-lg mb-5">
                Don&apos;t miss out on our limited-time offer. Get 20% off on
                all products. Shop now!
              </p>
              <Link
                href={"/books"}
                className=" bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementBanner;

/* eslint-disable @next/next/no-img-element */
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AiOutlineBars,
  AiOutlineCompress,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

export const navigation = [
  { name: "About", href: "/about" },
  { name: "Books", href: "/books" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
  const cart = useSelector((state) => state.book.cart);

  useEffect(() => {
    const storedUserDetails = window.localStorage.getItem("userDetails");
    const parsedUserDetails = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : null;
    setUserDetails(parsedUserDetails);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("userDetails");
    setUserDetails(null);
    router.push("/login");
  };

  return (
    <header className="mt-5">
      {/* Large Screen */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex items-center lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <div className="flex items-center gap-1">
              <img
                src="/logo.jpeg"
                className="h-10 w-10 rounded-xl object-cover"
                alt=""
              />
              <h1 className="text-center text-2xl font-semibold">BookPedia</h1>
            </div>
          </Link>
        </div>
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <AiOutlineBars className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
          {userDetails ? (
            <Link
              href={"/addbooks"}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Add Books
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="hidden lg:flex items-center gap-5 lg:flex-1 lg:justify-end">
          <Link href="/shoppingcart" className="relative mr-6">
            <AiOutlineShoppingCart className="h-6 w-6" />
            <div className="absolute left-6 text-xs border px-1.5 pt-0.5 rounded-full bg-red-500 text-white -top-2">
              <p>{cart.length}</p>
              <hr />
            </div>
          </Link>
          {userDetails ? (
            <>
              <p className="text-xl font-semibold">
                Hi, <span>{userDetails?.user?.firstName}</span>
              </p>
              <button
                className="bg-red-500 px-4 py-1 rounded-lg text-white"
                onClick={handleLogout}
              >
                Logout
              </button>

              <img
                className="h-8 w-8 rounded-full object-cover"
                src={userDetails?.user?.profilePicture}
                alt=""
              />
            </>
          ) : (
            <>
              <Link href={"/login"}>Login</Link>
              <Link href={"/register"}>Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <div className="flex items-center gap-1">
                  <img
                    src="/logo.jpeg"
                    className="h-10 w-10 rounded-xl object-cover"
                    alt=""
                  />
                  <h1 className="text-center text-2xl font-semibold">
                    BookPedia
                  </h1>
                </div>
              </Link>
            </div>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <AiOutlineCompress className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
                {userDetails ? (
                  <Link
                    href={"/addbooks"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Add Books
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="py-6 flex items-center gap-5">
                <Link href="/shoppingcart" className="relative mr-6">
                  <AiOutlineShoppingCart className="h-6 w-6" />
                  <div className="absolute left-6 text-xs border px-1.5 pt-0.5 rounded-full bg-red-500 text-white -top-2">
                    <p>{cart.length}</p>
                    <hr />
                  </div>
                </Link>
                {userDetails ? (
                  <>
                    <button
                      className="bg-red-500 px-4 py-1 rounded-lg text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                    <p>
                      HI <span>{userDetails?.user?.firstName}</span>
                    </p>
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={userDetails?.user?.profilePicture}
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <Link href={"/login"}>Login</Link>
                    <Link href={"/register"}>Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;

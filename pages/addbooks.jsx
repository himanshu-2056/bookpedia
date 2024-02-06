import { AuthLayout } from "@/components/AuthLayout";
import Layout from "@/components/common/Layout";
import TextField from "@/components/common/TextField";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  bookregisterFailure,
  bookregisterSuccess,
  registerBook,
} from "@/redux/slices/bookSlice";

const DynamicReactQuill = dynamic(
  () => import("react-quill").then((mod) => mod.default || mod),
  {
    ssr: false,
  }
);

const AddBooks = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.book.loading);
  const error = useSelector((state) => state.book.error);
  const success = useSelector((state) => state.book.success);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription("");
  }, []);

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const requestData = {
        ...formData,
        description: description,
      };

      dispatch(registerBook(requestData))
        .then(() => {
          dispatch(bookregisterSuccess());
          router.push("/");
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Registration failed.";
          dispatch(bookregisterFailure(errorMessage));
        });
    } catch (validationErrors) {
      const errors = {};
      if (validationErrors.inner && validationErrors.inner.length > 0) {
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
      }
      setErrors(errors);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Book Name is required"),
    author: Yup.string().required("Author Name is required"),
    price: Yup.number().required("Price is required"),
    category: Yup.string().required("Category is Required"),
    image: Yup.mixed().required("Profile Picture is required"),
  });

  return (
    <>
      <Head>
        <title>Sign Up - BookPedia</title>
      </Head>
      <Layout>
        <AuthLayout title="Add Books">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <TextField
                  id="name"
                  name="name"
                  label="Book Name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name}</div>
                )}
              </div>
              <div>
                <TextField
                  id="author"
                  name="author"
                  label="Author of Book"
                  value={formData.author}
                  onChange={handleChange}
                  error={errors.author}
                />
                {errors.author && (
                  <div className="text-red-500">{errors.author}</div>
                )}
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-6">
                <div>
                  <TextField
                    id="price"
                    name="price"
                    label="Price"
                    value={formData.price}
                    onChange={handleChange}
                    error={errors.price}
                  />
                  {errors.price && (
                    <div className="text-red-500">{errors.price}</div>
                  )}
                </div>
                <div>
                  <TextField
                    id="category"
                    name="category"
                    label="Category"
                    value={formData.category}
                    onChange={handleChange}
                    error={errors.category}
                  />
                  {errors.category && (
                    <div className="text-red-500">{errors.category}</div>
                  )}
                </div>
              </div>
              <div className="col-span-2  mb-10">
                <DynamicReactQuill
                  className="h-[400px]"
                  value={description}
                  onChange={handleEditorChange}
                />
              </div>
              <div className="col-span-2 mt-5">
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Book Picture
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleFileChange}
                  className="'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'"
                />
                {errors.image && (
                  <div className="text-red-500">{errors.image}</div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 w-full relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors py-2 rounded-xl"
            >
              Add Book
            </button>
          </form>
        </AuthLayout>
      </Layout>
    </>
  );
};

export default AddBooks;

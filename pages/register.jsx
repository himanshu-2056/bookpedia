import Head from "next/head";
import Link from "next/link";
import { AuthLayout } from "@/components/AuthLayout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerFailure,
  registerSuccess,
  registerUser,
  resetRegistration,
} from "@/redux/slices/userSlice";
import { useRouter } from "next/router";
import * as Yup from "yup";
import TextField from "@/components/common/TextField";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const success = useSelector((state) => state.user.success);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});

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
        profilePicture: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        dispatch(registerUser(formData))
          .then(() => {
            dispatch(registerSuccess());
            router.push("/login");
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message ||
              error.message ||
              "Registration failed.";
            dispatch(registerFailure(errorMessage));
          });
      })
      .catch((validationErrors) => {
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
      });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    profilePicture: Yup.mixed().required("Profile Picture is required"),
  });

  return (
    <>
      <Head>
        <title>Sign Up - LegacyLibrary</title>
      </Head>
      <AuthLayout
        title="Sign up for an account"
        subtitle={
          <>
            Already registered?{" "}
            <Link href="/login" className="text-cyan-600">
              Sign in
            </Link>{" "}
            to your account.
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              {errors.firstName && (
                <div className="text-red-500">{errors.firstName}</div>
              )}
            </div>
            <div>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
              {errors.lastName && (
                <div className="text-red-500">{errors.lastName}</div>
              )}
            </div>
            <div className="col-span-2">
              <TextField
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>
            <div className="col-span-2">
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              {errors.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
            </div>
            <div className="col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Profile Picture
              </label>
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                onChange={handleFileChange}
                className="'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'"
              />
              {error && error.field === "profilePicture" && (
                <div className="text-red-500">{error.message}</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors py-2 rounded-xl"
          >
            {loading ? "Loading..." : "Sign up to account"}
          </button>
        </form>
      </AuthLayout>
    </>
  );
}

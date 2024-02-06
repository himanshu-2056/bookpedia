import Head from "next/head";
import Link from "next/link";
import { AuthLayout } from "@/components/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loginUser } from "@/redux/slices/userSlice";
import TextField from "@/components/common/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const success = useSelector((state) => state.user.success);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values))
        .then(() => {
          if (!error) {
            router.push("/");
          } else {
            console.error("Login error:", error);
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    },
  });

  return (
    <>
      <Head>
        <title>Sign In - BookFeed</title>
      </Head>
      <AuthLayout
        title="Sign in to account"
        subtitle={
          <>
            Don’t have an account?{" "}
            <Link href="/register" className="text-cyan-600">
              Sign up
            </Link>{" "}
            for a free trial.
          </>
        }
      >
        {error ? (
          <h1 className="mb-10 text-lg text-center text-red-500">{error}</h1>
        ) : (
          ""
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <TextField
              label="Email Address"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              touched={formik.touched.email}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
              touched={formik.touched.password}
            />
          </div>
          <button
            type="submit"
            color="cyan"
            className="mt-8 w-full relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors py-2 rounded-xl"
          >
            {loading ? (
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            ) : (
              "Sign in  account"
            )}
          </button>
        </form>
      </AuthLayout>
    </>
  );
}

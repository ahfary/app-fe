"use client";

import { useAuthModule } from "@/hooks/useAuthModule";
import { FormikProvider, useFormik } from "formik";
import Link from "next/link";

import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
export default function SignInPage() {
  const { useLogin } = useAuthModule();
  const mutate = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      mutate.mutate(values);
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-violet-200">
      <h1 className="text-2xl font-bold mb-6 text-black">Login</h1>
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col rounded-xl bg-white p-6 gap-4"
        >
          <input
            type="text"
            placeholder="Email"
            className="input"
            onChange={(e) => {
              formik.setFieldValue("email", e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            onChange={(e) => {
              formik.setFieldValue("password", e.target.value);
            }}
            required
          />
          <button type="submit" className="btn btn-info">
            Login
          </button>
          <span className="text-black text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-info font-bold">
              Register
            </Link>
          </span>
        </form>
      </FormikProvider>
    </div>
  );
}

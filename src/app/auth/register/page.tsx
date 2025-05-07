"use client";

import { useAuthModule } from "@/hooks/useAuthModule";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";

import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
export default function SignUpPage() {
  const router = useRouter();
  const { useRegister } = useAuthModule();
  const mutate = useRegister();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      mutate.mutate(values);
      router.push("/auth/verify");
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-violet-200">
      <h1 className="text-2xl font-bold mb-6 text-black">Register</h1>

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
            Already have an account?{" "}
            <Link href="/auth/login" className="text-info font-bold">
              Login
            </Link>
          </span>
        </form>
      </FormikProvider>
    </div>
  );
}

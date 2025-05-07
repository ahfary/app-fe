"use client";
import { useAuthModule } from "@/hooks/useAuthModule";
import { useFormik, FormikProvider } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

import * as Yup from "yup";

const verifySchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  otp: Yup.string().required("OTP is required"),
});

export default function VerifyOtpPage() {
  const router = useRouter();
  const { useVerify } = useAuthModule();
  const mutate = useVerify();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: verifySchema,
    onSubmit: (values) => {
      mutate.mutate(values);
      router.push("/member");
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-violet-200">
      <h1 className="text-2xl font-bold mb-6 text-black">Verify OTP</h1>
      <FormikProvider value={formik}>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        >
          <div className="w-full max-w-md space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="input w-full"
              onChange={(e) => {
                formik.setFieldValue("email", e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="OTP"
              className="input w-full"
              onChange={(e) => {
                formik.setFieldValue("otp", e.target.value);
              }}
            />
            <button className="btn btn-info w-full" type="submit">
              Verify
            </button>
            <div className="text-center text-black text-sm">
              Didnt receive OTP? {" "}
              <Link href="/auth/register" className="text-info font-bold">
                Resend OTP
              </Link>
            </div>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Cookie from "js-cookie";

export const useAuthModule = () => {
  const router = useRouter();
  const login = async (payload: any): Promise<any> => {
    return await axiosClient
      .post("/auth/login", payload)
      .then((res) => res.data);
  };

  const verify = async (payload: any): Promise<any> => {
    return await axiosClient
      .post("/auth/verify", payload)
      .then((res) => res.data);
  };

  const register = async (payload: any): Promise<any> => {
    return await axiosClient
      .post("/auth/register", payload)
      .then((res) => res.data);
  };

  const useLogin = () => {
    const mutate = useMutation({
      mutationFn: (payload: any) => login(payload as any),
      onSuccess: (data) => {
        console.log("Login successful", data);

        Cookie.set("token", data.accessToken);

        if (data.user.role === "MEMBER") {
          router.push("/member");
        }
        if (data.user.role === "ADMIN") {
          router.push("/admin");
        }
        if (data.user.role === "USER") {
          router.push("/user");
        }
      },
    });
    return mutate;
  };

  const useVerify = () => {
    const mutate = useMutation({
      mutationFn: (payload: any) => verify(payload as any),
      onSuccess: (data) => {
        console.log("Verify successful", data);
      },
    });
    return mutate;
  };

  const useRegister = () => {
    const mutate = useMutation({
      mutationFn: (payload: any) => register(payload as any),
      onSuccess: (data) => {
        const otp = data.otp;

        if (otp) {
          alert(`Your OTP is: ${otp}`);
          router.push(`/auth/verify?email=${data.email}`);
        }
        console.log("Register successful", data);
      },
      onError: (error) => {
        console.log("Register failed", error);
      },
    });
    return mutate;
  };

  return { useLogin, useRegister, useVerify };
};

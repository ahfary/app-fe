"use client";
import { useAuthModule } from "@/hooks/useAuthModule";
import React from "react";

const UserPage = () => {
  const { useLogout, useProfile } = useAuthModule();
  const { data } = useProfile();
  return (
    <div>
      <div className="bg-white rounded-lg p-6 text-black">
        {data?.email}
        <p>role: {data?.role}</p>
      </div>
      <button className="btn btn-error" onClick={useLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserPage;

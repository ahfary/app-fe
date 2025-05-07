/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useAuthModule } from "@/hooks/useAuthModule";
import React from "react";

const MemberPage = () => {
  const { useLogout, useMember } = useAuthModule();
  const { data } = useMember();

  console.log(data)

  return (
    <div>
      <div className="grid grid-cols-3 gap-12">
        {data &&
          data.map((d: any, i: number) => (
            <div
              className="flex flex-col justify-center items-center bg-white rounded-lg w-full h-12 text-black text-sm p-8"
              key={i}
            >
              <p>{d.email}</p>
              <p>role: {d.role}</p>
            </div>
          ))}
      </div>
      <button className="btn btn-error" onClick={useLogout}>
        Logout
      </button>
    </div>
  );
};

export default MemberPage;

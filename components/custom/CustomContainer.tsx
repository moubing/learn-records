import { ReactNode } from "react";

export const CustomContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen overflow-auto p-10 flex items-center justify-center">
      <div className="rounded-2xl bg-gray-100 shadow-md h-full w-full p-10">
        {children}
      </div>
    </div>
  );
};

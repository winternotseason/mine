import React from "react";
import RQProvider from "./_component/Provider/RQProvider";
import Header from "../_component/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex justify-center">
      <RQProvider>
        <div className="w-full h-full max-w-[80rem]">{children}</div>
      </RQProvider>
    </div>
  );
};

export default Layout;


// md:flex lg:flex md:justify-center lg:justify-center
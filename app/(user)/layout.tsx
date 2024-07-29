import React from "react";
import RQProvider from "./_component/RQProvider";
import Header from "../_component/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center">
        <RQProvider>
          <div className="w-full h-full"> {children}</div>
        </RQProvider>
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import MainNav from "@/components/fixed/main-nav";
import MainHeader from "@/components/fixed/main-header";
import RQProvider from "./_component/RQProvider";
import Header from "../_component/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full pt-20  flex flex-col items-center">
        <RQProvider>
          <Header />
          <div className="w-full h-full "> {children}</div>
        </RQProvider>
      </div>
    </div>
  );
};

export default Layout;

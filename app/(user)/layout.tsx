import React from "react";
import MainNav from "@/components/fixed/main-nav";
import MainHeader from "@/components/fixed/main-header";
import RQProvider from "./main/_component/RQProvider";
import Header from "./_component/Header";
import Nav from "./_component/Nav";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full pt-16 pb-16">
        <RQProvider>
          <Header />
          {children}
          <Nav />
        </RQProvider>
      </div>
    </div>
  );
};

export default Layout;

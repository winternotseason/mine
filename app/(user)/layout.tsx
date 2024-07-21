import React from "react";
import MainNav from "@/components/fixed/main-nav";
import MainHeader from "@/components/fixed/main-header";
import RQProvider from "./_component/RQProvider";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full pt-20 pb-20">
        <RQProvider>
          <MainHeader />
          {children}
          <MainNav />
        </RQProvider>
      </div>
    </div>
  );
};

export default Layout;

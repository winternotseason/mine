import React from "react";
import MainNav from "@/components/fixed/main-nav";
import MainHeader from "@/components/fixed/main-header";
import Footer from "@/components/footer";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between pt-20 pb-[3rem]">
      <MainHeader />
      {children}
      <Footer />
      <MainNav />
    </div>
  );
};

export default Layout;

import React from "react";
import MainNav from "@/components/fixed/main-nav";
import MainHeader from "@/components/fixed/main-header";
import Footer from "@/components/footer";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainHeader />
      {children}
      <Footer />
      <MainNav />
    </div>
  );
};

export default Layout;

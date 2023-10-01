import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div>
          <Navbar />
        </div>
        <main className="flex-grow">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Layout;
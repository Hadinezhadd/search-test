import React from "react";
import "./styles.module.scss";
import Header from "../Header";
import Footer from "../Footer";

const Layout = (props) => {
  return (
    <>
      <Header />
      <main role="main">{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;

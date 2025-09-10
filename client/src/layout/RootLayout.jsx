import { Outlet } from "react-router";
import Header from "../components/header";
import Footer from "../components/Footer";

function RootLayout() {
  return ( 
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}

export default RootLayout;
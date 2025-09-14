import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <>
            <Navbar/>
            <Hero />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;

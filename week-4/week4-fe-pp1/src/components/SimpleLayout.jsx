import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const SimpleLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet />
        </>
    );
};

export default SimpleLayout;

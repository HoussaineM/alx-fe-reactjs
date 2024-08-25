import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Header />
            <div className="outlet">
            <Outlet/>
            </div>
            <SideBar/>
        </div>
    );
}

export default Layout;
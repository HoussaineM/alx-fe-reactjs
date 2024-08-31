import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Profile() {
    //let { path, url } = useRouteMatch();
    const Routes = "routes";
    const ProfileDetails = "ProfileDetails";

    const random = Math.floor(Math.random() * 10);
    return (
        <div>
            <Link to="/"> Home</Link>
            <Link to="/profile/details">profileDetails</Link>
            <Link to="/profile/settings">ProfileSettings</Link>
            <Link to={`/blog/${random}`}>Blogs</Link>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
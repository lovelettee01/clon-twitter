import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "components/Navgation";

function Main() {
    return (
        <>
            {/* all the other elements */}
            <Navigation />
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
export default Main;

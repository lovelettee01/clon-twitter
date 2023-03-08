import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "components/Navgation";

function Main({ userInfo }) {
    return (
        <>
            {/* all the other elements */}
            <Navigation userInfo={userInfo} />
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
export default Main;

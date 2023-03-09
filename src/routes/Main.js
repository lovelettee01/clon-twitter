import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "components/Navgation";

function Main({ userInfo }) {
  return (
    <>
      <Navigation userInfo={userInfo} />
      <div style={{ marginTop: "20px" }}>
        <Outlet />
      </div>
    </>
  );
}
export default Main;

import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  HashRouter as Router,
  Link,
} from "react-router-dom";

import Auth from "../routes/Auth";
import Home from "../routes/Home";

const homeRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
]);

const myRouter = ({ isLogined }) => {
  return (
    <>
      {isLogined ? (
        <RouterProvider router={homeRouter} />
      ) : (
        <RouterProvider router={authRouter} />
      )}
    </>
  );
};

export default myRouter;

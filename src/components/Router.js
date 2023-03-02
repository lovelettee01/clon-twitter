import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Auth from "routes/Auth";
import Main from "routes/Main";
import Home from "routes/Home";
import Profile from "routes/Profile";

const myRouter = ({ isLogined, userInfo }) => {

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home userInfo={userInfo} />,
        },
        {
          path: "profile",
          element: <Profile userInfo={userInfo} />,
        },
      ],
    },
  ]);

  if(!isLogined) {
    router.routes[0].element = <Auth />;
  }

  return <RouterProvider router={router} />;
};

export default myRouter;

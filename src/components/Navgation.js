import React from "react";
import { authService } from "firebase.config";
import { Link } from "react-router-dom";

const Navigation = () => {
  const logout = async () => {
    await authService.signOut();
  };
  console.log(`Navigation`);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};
export default Navigation;

import React from "react";
import { authService } from "firebase.config";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ userInfo }) => {
    const navigate = useNavigate();
    const onLogoutClick = async () => {
        await authService.signOut();
        navigate("/");
    };
    return (
        <div id="sidebar">
            {/* other elements */}

            <nav>
                <ul>
                    <li>
                        <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                        <Link to={`profile`}>
                            {userInfo.displayName}`s Profile
                        </Link>
                    </li>
                </ul>
                <div style={{ position: "absolute", right: 10, top: 10 }}>
                    <button onClick={onLogoutClick}>Logout</button>
                </div>
            </nav>

            {/* other elements */}
        </div>
    );
};
export default Navigation;

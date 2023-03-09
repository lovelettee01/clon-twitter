import React, { useState } from "react";
import { authService } from "../firebase.config";
import { updateProfile } from "firebase/auth";

import TweetList from "components/tweet/TweetList";

const Profile = ({ userInfo, refreshUser }) => {
    const { displayName } = userInfo;
    const [userName, setUserName] = useState(displayName);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userInfo.displayName === userName) return;
            await updateProfile(authService.currentUser, {
                displayName: userName,
            });
            refreshUser();
        } catch (e) {
            console.error("Error updateProfile: ", e);
        }
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setUserName(value);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type={"text"}
                    placeholder={"Display Name."}
                    onChange={onChange}
                    value={userName}
                />
                <input type={"submit"} value={"Change Display Name"} />
            </form>

            <div style={{ paddingTop: "20px" }}>
                <span>My Tweet</span>
                <TweetList userInfo={userInfo} isMine={true} />
            </div>
        </>
    );
};
export default Profile;

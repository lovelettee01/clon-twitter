import React, { useState } from "react";
import { authService } from "../firebase.config";
import { updateProfile } from "firebase/auth";

import TweetList from "components/tweet/TweetList";
import { useNavigate } from "react-router-dom";

const Profile = ({ userInfo, refreshUser }) => {
  const { displayName } = userInfo;
  const [userName, setUserName] = useState(displayName);
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    await authService.signOut();
    navigate("/");
  };

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
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={userName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
        <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
          Log Out
        </span>
      </form>

      <div style={{ marginTop: "20px" }}>
        <TweetList userInfo={userInfo} isMine={true} />
      </div>
    </>
  );
};
export default Profile;

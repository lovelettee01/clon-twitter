import React from "react";

import TweetFactory from "components/tweet/TweetFactory";
import TweetList from "components/tweet/TweetList";

const Home = ({ userInfo }) => {
  return (
    <>
      <TweetFactory userInfo={userInfo} />
      <div style={{ marginTop: "30" }}>
        <TweetList userInfo={userInfo} />
      </div>
    </>
  );
};
export default Home;

import React from "react";

import TweetFactory from "components/tweet/TweetFactory";
import TweetList from "components/tweet/TweetList";

const Home = ({ userInfo }) => {
    return (
        <>
            <div>
                <TweetFactory userInfo={userInfo} />

                <div style={{ paddingTop: "20px" }}>
                    <TweetList userInfo={userInfo} />
                </div>
            </div>
        </>
    );
};
export default Home;

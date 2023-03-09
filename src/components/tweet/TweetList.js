import React, { useEffect, useState } from "react";

import { storeService } from "firebase.config";
import {
    collection,
    onSnapshot,
    query,
    where,
    orderBy,
} from "firebase/firestore";

import Tweet from "components/tweet/Tweet";

const COLLECTION_NAME = process.env.REACT_APP_COLLECTION_NAME;
const TweetList = ({ userInfo, isMine }) => {
    const { uid } = userInfo;
    const [tweetList, setTweetList] = useState([]);

    const queryCollection = query(
        collection(storeService, COLLECTION_NAME),
        isMine ? where("creatorId", "==", uid) : null,
        orderBy("createAt")
    );

    useEffect(() => {
        onSnapshot(queryCollection, (snapshot) => {
            setTweetList([]);
            console.log("Current data: ", snapshot.docs);
            snapshot.docs.forEach((doc) => {
                const newDoc = {
                    id: doc.id,
                    ...doc.data(),
                };
                setTweetList((prev) => [newDoc, ...prev]);
            });
        });
    }, [uid]);
    return (
        <>
            {tweetList.length > 0 &&
                tweetList.map((tweet) => {
                    return (
                        <Tweet
                            key={tweet.id}
                            tweetInfo={tweet}
                            isOwner={tweet.creatorId === uid}
                        />
                    );
                })}
        </>
    );
};
export default TweetList;

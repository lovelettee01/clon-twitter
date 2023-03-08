import React, { useState, useEffect } from "react";
import { authService, storeService } from "../firebase.config";
import { updateProfile } from "firebase/auth";
import {
    collection,
    onSnapshot,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import Tweet from "components/Tweet";

const COLLECTION_NAME = "tweets";
const Profile = ({ userInfo, refreshUser }) => {
    const { uid, displayName } = userInfo;
    const [userName, setUserName] = useState(displayName);
    const [tweetList, setTweetList] = useState([]);

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

    useEffect(() => {
        const queryCollection = query(
            collection(storeService, COLLECTION_NAME),
            where("creatorId", "==", uid),
            orderBy("createAt")
        );
        onSnapshot(queryCollection, (snapshot) => {
            setTweetList([]);
            console.log("My Tweet data: ", snapshot.docs);
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
                {tweetList.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        tweetInfo={tweet}
                        isOwner={tweet.creatorId === uid}
                    />
                ))}
            </div>
        </>
    );
};
export default Profile;

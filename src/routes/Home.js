import React, { useEffect, useState } from "react";
import { storeService } from "../firebase.config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Tweet from "components/Tweet";

const COLLECTION_NAME = "tweets";
const Home = ({ userInfo }) => {
    const { uid } = userInfo;
    const [tweet, setTweet] = useState("");
    const [tweetList, setTweetList] = useState([]);
    console.log(`Home`, tweetList);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(
                collection(storeService, COLLECTION_NAME),
                {
                    creatorId: uid,
                    comment: tweet,
                    createAt: Date.now(),
                }
            );
            setTweet("");
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setTweet(value);
    };

    useEffect(() => {
        onSnapshot(collection(storeService, COLLECTION_NAME), (snapshot) => {
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
    }, []);
    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        type={"text"}
                        placeholder={"Whas`s on your mind?"}
                        maxLength={120}
                        onChange={onChange}
                        value={tweet}
                    />
                    &nbsp;
                    <input type={"submit"} value={"tweet"} />
                </form>

                <div>
                    {tweetList.map((tweet) => (
                        <Tweet
                            key={tweet.id}
                            tweetInfo={tweet}
                            isOwner={tweet.creatorId === uid}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
export default Home;

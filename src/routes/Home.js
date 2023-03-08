import React, { useEffect, useState } from "react";
import { storeService, storageService } from "../firebase.config";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Tweet from "components/Tweet";
import { v4 as uuidv4 } from "uuid";

const COLLECTION_NAME = "tweets";
const Home = ({ userInfo }) => {
    const { uid } = userInfo;
    const [tweet, setTweet] = useState("");
    const [tweetList, setTweetList] = useState([]);
    const [attachment, setAttachment] = useState(null);
    //console.log(`Home`, tweetList);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (tweet === "") {
            window.alert("Insert Tweet Commet..");
            document.getElementById("tweetComment").focus();
            return;
        }
        try {
            let attachmentUrl = "";
            if (attachment) {
                const fileRef = await ref(
                    storageService,
                    `upload/${userInfo.uid}/${uuidv4()}`
                );

                const response = await uploadString(
                    fileRef,
                    attachment,
                    "data_url"
                );
                attachmentUrl = await getDownloadURL(response.ref);
            }

            //if (attachmentUrl !== "") {
            const docRef = await addDoc(
                collection(storeService, COLLECTION_NAME),
                {
                    creatorId: uid,
                    comment: tweet,
                    createAt: Date.now(),
                    attachmentUrl,
                }
            );
            setTweet("");
            setAttachment(null);
            console.log("Document written with ID: ", docRef.id);
            // }
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

    const onFileChange = (e) => {
        e.preventDefault();
        const {
            target: { files },
        } = e;
        const thisFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                target: { result },
            } = finishedEvent;
            setAttachment(result);
            console.log(finishedEvent);
        };
        reader.readAsDataURL(thisFile);
    };

    const onClearFile = (e) => {
        e.preventDefault();
        setAttachment(null);
    };

    useEffect(() => {
        const queryCollection = query(
            collection(storeService, COLLECTION_NAME),
            orderBy("createAt")
        );
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
    }, []);
    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        type={"text"}
                        id="tweetComment"
                        placeholder={"Whas`s on your mind?"}
                        maxLength={120}
                        onChange={onChange}
                        value={tweet}
                    />
                    &nbsp;
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        value={""}
                    />
                    <input type={"submit"} value={"tweet"} />
                    {attachment && (
                        <>
                            <img
                                src={attachment}
                                alt="Preview"
                                width="50px"
                                height="50px"
                            />
                            <button onClick={onClearFile}>취소</button>
                        </>
                    )}
                </form>

                <div style={{ paddingTop: "20px" }}>
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

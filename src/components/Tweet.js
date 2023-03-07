import React, { useState } from "react";
import { storeService, storageService } from "../firebase.config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const COLLECTION_NAME = "tweets";
const Tweet = ({ tweetInfo, isOwner }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetInfo.comment);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you Delete?");
        if (ok) {
            await deleteDoc(doc(storeService, COLLECTION_NAME, tweetInfo.id));

            const fileRef = ref(storageService, tweetInfo.attachmentUrl);
            const result = await deleteObject(fileRef);
            console.log("result", result);
        }
    };

    const onModifyClick = () => setIsEdit((prev) => !prev);
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewTweet(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(storeService, COLLECTION_NAME, tweetInfo.id), {
            comment: newTweet,
        });
        setIsEdit((prev) => !prev);
    };
    return (
        <div key={tweetInfo.id}>
            {isEdit ? (
                <form onSubmit={onSubmit}>
                    <input
                        required
                        placeholder="Modify Tweet Comments"
                        type="text"
                        value={newTweet}
                        onChange={onChange}
                    />
                    <input type="submit" value="저장" />
                    <button onClick={onModifyClick}>취소</button>
                </form>
            ) : (
                <>
                    {tweetInfo.attachmentUrl && (
                        <img
                            src={tweetInfo.attachmentUrl}
                            width="50px"
                            alt="tweet icon"
                            height="50px"
                        />
                    )}
                    <h4>{tweetInfo.comment} </h4>
                    {isOwner && (
                        <>
                            <button onClick={onModifyClick}>Modify</button>
                            <button onClick={onDeleteClick}>Delete</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Tweet;

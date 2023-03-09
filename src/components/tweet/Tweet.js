import React, { useState } from "react";
import { storeService, storageService } from "firebase.config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const COLLECTION_NAME = process.env.REACT_APP_COLLECTION_NAME;
const Tweet = ({ tweetInfo, isOwner }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetInfo.comment);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you Delete?");
    if (ok) {
      await deleteDoc(doc(storeService, COLLECTION_NAME, tweetInfo.id));

      if (tweetInfo.attachmentUrl !== "") {
        const fileRef = ref(storageService, tweetInfo.attachmentUrl);
        const result = await deleteObject(fileRef);
        console.log("result", result);
      }
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
    <div className="tweet" key={tweetInfo.id}>
      {isEdit ? (
        <>
          <form onSubmit={onSubmit} className="container tweetEdit">
            <input
              required
              placeholder="Modify Tweet Comments"
              type="text"
              autoFocus
              value={newTweet}
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Tweet" className="formBtn" />
          </form>
          <span onClick={onModifyClick} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{tweetInfo.comment}</h4>
          {tweetInfo.attachmentUrl && (
            <img src={tweetInfo.attachmentUrl} alt="Tweet Upload Photos" />
          )}
          {isOwner && (
            <div className="tweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={onModifyClick}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;

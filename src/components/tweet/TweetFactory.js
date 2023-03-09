import React, { useState } from "react";

import { storeService, storageService } from "firebase.config";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuidv4 } from "uuid";

const COLLECTION_NAME = process.env.REACT_APP_COLLECTION_NAME;
const TweetFactory = ({ userInfo }) => {
  const { uid } = userInfo;
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState(null);

  //Write New Tweet
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

        const response = await uploadString(fileRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(response.ref);
      }

      //if (attachmentUrl !== "") {
      const docRef = await addDoc(collection(storeService, COLLECTION_NAME), {
        creatorId: uid,
        comment: tweet,
        createAt: Date.now(),
        attachmentUrl,
      });
      setTweet("");
      setAttachment(null);
      console.log("Document written with ID: ", docRef.id);
      // }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //Tweet Comment change Event
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };

  //Tweet Image File change Event
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
    };
    reader.readAsDataURL(thisFile);
  };

  //Tweet Image File clear Event
  const onClearFile = (e) => {
    e.preventDefault();
    setAttachment(null);
  };
  return (
    <>
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            type="text"
            id="tweetComment"
            placeholder="Whats`s on your mind?"
            maxLength={120}
            onChange={onChange}
            value={tweet}
            className="factoryInput__input"
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              alt="Preview"
              style={{
                backgroundImage: attachment,
              }}
            />
            <div className="factoryForm__clear" onClick={onClearFile}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default TweetFactory;

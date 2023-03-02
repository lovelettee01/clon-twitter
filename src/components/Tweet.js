import React from "react";

const Tweet = ({ tweetInfo }) => {
  return (
    <div key={tweetInfo.id}>
      <h4>{tweetInfo.comment} </h4>
      <button>Modify</button>
      <button>Delete</button>
    </div>
  );
};

export default Tweet;

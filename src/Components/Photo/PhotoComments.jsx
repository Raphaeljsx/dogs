import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

const PhotoComments = ({ id, comments, single }) => {
  const { login } = useContext(UserContext);
  const [writer, setWriter] = useState(() => comments);
  const commentSection = useRef(null);

  useEffect(() => {
    commentSection.current.scrollTop = 200;
  }, [writer, commentSection]);
  return (
    <>
      <ul
        ref={commentSection}
        className={`${styles.comments} ${single ? styles.single : ""}`}
      >
        {writer.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && (
        <PhotoCommentsForm single={single} id={id} setWriter={setWriter} />
      )}
    </>
  );
};

export default PhotoComments;

import React, { useState } from "react";
import Enviar from "../../assets/enviar.svg?react";
import { useFetch } from "../../Hooks/UseFetch";
import { COMMENT_POST } from "../../api/api";
import Error from "../../Helper/Error";
import styles from "./PhotoCommentsForm.module.css";

const PhotoCommentsForm = ({ id, setWriter, single }) => {
  const [comment, setComment] = useState("");
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const localToken = window.localStorage.getItem("token");
    const { url, options } = COMMENT_POST(id, { comment }, localToken);
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment("");
      setWriter((comments) => [...comments, json]);
    }
  }

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => {
          setComment(target.value);
        }}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;

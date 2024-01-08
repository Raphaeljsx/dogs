import React from "react";
import styles from "./PhotoDelete.module.css";
import { PHOTO_DELETE } from "../../api/api";
import { useFetch } from "../../Hooks/UseFetch";

const PhotoDelete = ({ id }) => {
  const { request, loading } = useFetch();

  async function handleClick(event) {
    event.preventDefault();
    const confirm = window.confirm("Tem certeza que deseja apagar a foto?");

    if (confirm) {
      const token = window.localStorage.getItem("token");
      const { url, options } = PHOTO_DELETE(id, token);
      const { response } = await request(url, options);
      if (response.ok) {
        window.location.reload();
      }
    }
  }

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletar
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;

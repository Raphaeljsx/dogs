import React, { useEffect } from "react";
import styles from "./FeedModal.module.css";
import { useFetch } from "../../Hooks/UseFetch";

import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import { PHOTO_GET } from "../../api/api";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  return (
    <div
      className={styles.modal}
      onClick={(event) => {
        if (event.target === event.currentTarget) setModalPhoto(null);
      }}
    >
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;

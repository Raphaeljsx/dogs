import React, { useEffect } from "react";
import styles from "./FeedModal.module.css";
import { useFetch } from "../../Hooks/UseFetch";
import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";
import { PHOTO_GET } from "../../api/api";
import { useStorePhoto } from "../../store/useStore";

const FeedModal = ({ photo, setModalPhoto }) => {

  const { loading, error, data, fetchPhotos } = useStorePhoto();

  useEffect(()=>{
    if(photo) fetchPhotos(photo.id)
  }, [photo, fetchPhotos]);

  return (
    <div
      className={styles.modal}
      onClick={(event) => {
        if (event.target === event.currentTarget) setModalPhoto(null);
      }}
    >
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent  />}
    </div>
  );
};

export default FeedModal;

import React, { useEffect } from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import { useFetch } from "../../Hooks/UseFetch";
import { PHOTOS_GET } from "../../api/api";
import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({ user, page, setModalPhoto, setInfinite }) => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);

      if (response && response.ok && json.length < total) setInfinite(false);
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((item) => {
          return (
            <FeedPhotosItem
              key={item.id}
              photo={item}
              setModalPhoto={setModalPhoto}
            />
          );
        })}
      </ul>
    );
  else return null;
};

export default FeedPhotos;

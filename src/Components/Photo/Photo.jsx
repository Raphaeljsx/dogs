import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../Hooks/UseFetch";
import { PHOTO_GETID } from "../../api/api";
import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading";
import PhotoContent from "./PhotoContent";
import Head from "../../Helper/Head";

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GETID(id);
    request(url, options);
  }, [id, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        <PhotoContent single={true} data={data} />
      </section>
    );
  else return null;
};

export default Photo;

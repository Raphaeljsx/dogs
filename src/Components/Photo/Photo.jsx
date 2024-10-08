import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading";
import PhotoContent from "./PhotoContent";
import Head from "../../Helper/Head";
import { useStorePhoto } from "../../store/useStore";

const Photo = () => {
  const { id } = useParams();
  const { loading, error, data, fetchPhotos } = useStorePhoto();

  useEffect(()=>{
    if(id) fetchPhotos(id)
  }, [id, fetchPhotos]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        <PhotoContent single={ true }  />
      </section>
    );
  else return null;
};

export default Photo;

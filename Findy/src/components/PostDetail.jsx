import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import iconNoti from "/icons/heart.svg";
import iconComentario from "/icons/comentario.svg";
import iconResponse from "/icons/responses.svg";
import iconEnviar from "/icons/enviar.svg";
import atras from "/icons/atras.svg";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

const PostDetail = () => {
  const { userId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null); // Nuevo estado para el usuario
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const response = await fetch(
          `https://fake-api-eight-gilt.vercel.app/users/${userId}`
        );
        if (!response.ok) {
          throw new Error(`Error al obtener el usuario: ${response.status}`);
        }
        const userData = await response.json();

        // Buscar el post específico dentro del usuario
        const selectedPost = userData.posts.find(
          (post) => post.postId.toString() === postId
        );

        if (selectedPost) {
          setPost(selectedPost);
          setUser(userData); // Guardar la información del usuario
        } else {
          throw new Error(`No se encontró el post con ID: ${postId}`);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
        setError(error.message);
      }
    };

    fetchUserPost();
  }, [userId, postId]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!post || !user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="lg:w-[90%] lg:ml-[20%] lg:p-1 lg:font-balsamiq w-full max-w-screen-xl font-balsamiq">
      <SideBar />
      <div className="fixed lg:hidden w-full items-center">
        <div className="flex justify-between items-center m-2">
          <div className="">
            <Link to={`/profile/${userId}`}>
              <img src={atras} alt={"atras"} />
            </Link>
          </div>
          <div>
            <p className="text-4xl leading-none mt-[-25px]">...</p>
          </div>
        </div>
      </div>
      <img
        className="lg:w-full lg:h-[500px] w-full h-[500px]"
        src={post.postPicture ? post.postPicture : "/default-cover.png"}
        alt={`Post ${postId}`}
      />
      <div className="relative flex justify-center m-auto">
        <div className="absolute lg:top-[-50px] top-[-40px] lg:p-10 p-5 gap-5 flex items-center justify-around lg:h-[100px] h-[80px] z-10 transform lg:bg-gray-300 bg-white rounded-[20px]">
          <img
            className=" lg:w-[60px] lg:h-[60px] w-[50px] h-[50px]"
            src={user.profilePicture}
            alt={user.username}
          />
          <p>{user.username}</p>
          <div className="flex right-0 text-center gap-4 items-center">
            <div className="flex flex-col">
              <img className="w-6 h-6" src={iconNoti} alt="Likes" />
              <p className="text-sm text-gray-700">{user.likes?.length}</p>
            </div>
            <div className="flex flex-col">
              <img className="w-6 h-6" src={iconComentario} alt="Comments" />
              <p className="text-sm text-gray-700">{user.comments?.length}</p>
            </div>
            <div className="flex flex-col">
              <img className="w-6 h-6" src={iconResponse} alt="Responses" />
              <p className="text-sm text-gray-700">{user.responses?.length}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-10 mb-[20px] relative lg:text-center text-justify font-baloo p-8 min-h-[376px]">
        {post.description}
      </p>

      <div className="flex justify-center gap-3 items-center w-[30%] m-auto pb-24">
        <img
          className=" lg:w-[45px] lg:h-[45px] w-[50px] h-[50px]"
          src={user.profilePicture}
          alt={user.username}
        />
        <input
          className="w-[356px] h-[40px] shadow-md rounded-[20px] p-5 border border-black"
          name="myInput"
          placeholder="Write comment as username...."
        />
        <img
          className="absolute lg:w-6 lg:h-6"
          src={iconEnviar}
          alt="Responses"
        />
      </div>
    </div>
  );
};

export default PostDetail;

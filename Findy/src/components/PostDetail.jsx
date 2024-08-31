import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import iconNoti from "/icons/heart.svg";
import iconComentario from "/icons/comentario.svg";
import iconResponse from "/icons/responses.svg";
import iconEnviar from "/icons/enviar.svg";
import atras from "/icons/atras.svg";
import corazonRelleno from "/icons/corazonRelleno.svg";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

const PostDetail = () => {
  const { userId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

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

        const selectedPost = userData.posts.find(
          (post) => post.postId.toString() === postId
        );

        if (selectedPost) {
          setPost(selectedPost);
          setUser(userData);

          const appState = JSON.parse(localStorage.getItem("appState")) || {
            likes: {},
            comments: {},
          };
          const postLikes = appState.likes[postId] || [];
          const postComments = appState.comments[postId] || [];

          setLikes(postLikes.length);
          setComments(postComments);
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

  const updateLocalStorage = (newLikes, newComments) => {
    const appState = JSON.parse(localStorage.getItem("appState")) || {
      likes: {},
      comments: {},
    };

    appState.likes[postId] = Array(newLikes).fill("1");

    appState.comments[postId] = newComments;

    localStorage.setItem("appState", JSON.stringify(appState));
  };

  const handleCommentInputChange = (event) => {
    setCommentInput(event.target.value);
  };

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
          <div className="flex right-0 text-center gap-4 ">
            <div className="flex flex-col">
              <img
                className="w-6 h-6"
                src={likes > 0 ? corazonRelleno : iconNoti}
                alt={likes > 0 ? "Likes filled" : "Likes"}
              />
              <p className="text-sm text-gray-700">{likes}</p>
            </div>
            <div className="flex flex-col">
              <img className="w-6 h-6" src={iconComentario} alt="Comments" />
              <p className="text-sm text-gray-700">{comments.length}</p>
            </div>
            <div className="flex flex-col">
              <img className="w-6 h-6" src={iconResponse} alt="Responses" />
              <p className="text-sm text-gray-700">{user.responses}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="lg:mt-20 mt-10 lg:mb-0 mb-[20px] relative lg:text-justify text-justify font-baloo p-8 lg:min-h-[250px] min-h-[376px] lg:text-[20px]">
        {post.description}
      </p>

      <div className="flex lg:w-[30%] m-auto pb-24 gap-3 justify-center">
        <div className="flex gap-4 items-center">
          <img
            className=" lg:w-[45px] lg:h-[45px] w-[50px] h-[50px]"
            src={user.profilePicture}
            alt={user.username}
          />
          <input
            className="lg:w-[356px] h-[40px] w-[300px] lg shadow-md rounded-[20px] p-5 border border-black"
            name="myInput"
            placeholder="Write comment as username...."
            value={commentInput}
            onChange={handleCommentInputChange}
          />
        </div>
        <div className="flex items-center">
          <img
            className="absolute lg:w-6 lg:h-6 lg:right-auto right-[50px]"
            src={iconEnviar}
            alt="Responses"
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

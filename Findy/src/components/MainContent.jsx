import { useState, useEffect } from "react";
import iconNoti from "/icons/heart.svg";
import iconComentario from "/icons/comentario.svg";
import iconResponse from "/icons/responses.svg";
import logoFindy from "/logo/LOGOFINDY.png";
import iconMensaje from "/icons/mensaje.svg";
import { useAppContext } from "./Context";
import { Link } from "react-router-dom";

function MainContent() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { state, dispatch } = useAppContext();
  const [commentInput, setCommentInput] = useState("");
  const [activePost, setActivePost] = useState(null);

  const handleLike = (postId, userId) => {
    dispatch({ type: "TOGGLE_LIKE", payload: { postId, userId } });
  };

  const handleComment = (postId, comment) => {
    if (comment.trim() === "") return;
    dispatch({ type: "ADD_COMMENT", payload: { postId, comment } });
    setCommentInput("");
  };

  useEffect(() => {
    fetch("https://fake-api-eight-gilt.vercel.app/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener los usuarios: ${response.status}`);
        }
        return response.json();
      })
      .then((usersData) => {
        const filteredUsers = usersData.filter(
          (user) => user.profilePicture && user.posts && user.posts.length > 0
        );
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col lg:items-center lg:w-[500px] max-w-screen-lg w-full mx-auto p-4 font-balsamiq">
      {/* Stories Section */}
      <div className="flex justify-between lg:hidden sm:block mb-5">
        <img src={logoFindy} alt="LogoFIndy" />
        <ul className="flex gap-2">
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img className="" src={iconNoti} alt="iconBuscar" />
          </li>
          <li className="flex cursor-pointer hover:text-pastel items-center">
            <img className="" src={iconMensaje} alt="iconBuscar" />
          </li>
        </ul>
      </div>
      <div className="mb-8 flex overflow-x-auto scrollbar-hide justify-center">
        <div className="flex space-x-4 ">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex-shrink-0 flex flex-col items-center"
            >
              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-16 h-16 rounded-full border-2 border-pink-500 p-1 object-cover"
              />
              <Link to={`/profile/${user.id}`}>
                <p className="mt-2 text-sm text-gray-700 flex items-center max-w-20">
                  {user.username.split(" ")[0]}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) =>
            user.posts.map((post) => (
              <div
                key={post.postId}
                className="bg-white p-4 border rounded-lg shadow-md"
              >
                <Link
                  to={`/profile/${user.id}`}
                  className="text-lg font-semibold text-gray-700 "
                >
                  <h3>{user.username}</h3>
                </Link>
                <img
                  src={post.postPicture}
                  alt={user.username}
                  className="w-full lg:h-[30rem] h-[25rem] rounded-lg object-cover mb-4 mt-4"
                />
                <div className="flex p-2 items-start gap-2">
                  <div className="flex flex-col items-center">
                    <button onClick={() => handleLike(post.postId, user.id)}>
                      {state.likes[post.postId]?.includes(user.id) ? (
                        "❤️"
                      ) : (
                        <img src={iconNoti} alt="Like" />
                      )}
                    </button>
                    <span>{state.likes[post.postId]?.length || 0}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      className="w-6 h-6 cursor-pointer"
                      src={iconComentario}
                      alt="Comment"
                      onClick={() =>
                        setActivePost(
                          activePost === post.postId ? null : post.postId
                        )
                      }
                    />
                    <span>{state.comments[post.postId]?.length || 0}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      className="w-6 h-6"
                      src={iconResponse}
                      alt="Responses"
                    />
                    <p className="text-sm text-gray-700">{user.responses}</p>
                  </div>
                </div>
                {activePost === post.postId && (
                  <div className="mt-4">
                    {state.comments[post.postId]?.map((comment, index) => (
                      <p key={index} className="text-sm text-gray-700">
                        {comment}
                      </p>
                    ))}
                    <input
                      type="text"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Add a comment..."
                      className="mt-2 border p-2 rounded w-full"
                    />
                    <button
                      onClick={() => handleComment(post.postId, commentInput)}
                      className="mt-2 text-white p-2 rounded bg-pastel"
                    >
                      Comment
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MainContent;

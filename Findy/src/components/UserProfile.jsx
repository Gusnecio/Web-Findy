import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";
import atras from "/icons/atras.svg";
function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://fake-api-eight-gilt.vercel.app/users/${userId}`
        );
        if (!response.ok) {
          throw new Error(`Error al obtener el usuario: ${response.status}`);
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    };

    fetchUser();
  }, [userId]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div>Cargando...</div>;
  }

  const coverPhoto = user.posts.find((post) => post.postId === 2);

  return (
    <div className="lg:w-[80%] lg:ml-[17%] lg:p-1 lg:font-balsamiq w-full max-w-screen-xl">
      <SideBar />
      <div className="relative">
        <div className="flex space-x-4 absolute left-4 top-4 lg:hidden">
          <div className="flex items-center justify-start mt-4">
            <img src={atras} alt={"atras"} />
          </div>
          <div>
            <p className=" ml-[300px] text-4xl">...</p>
          </div>
        </div>
        <img
          className="lg:w-full"
          src={coverPhoto ? coverPhoto.postPicture : "/default-cover.png"}
          alt={`${user.username}`}
        />
        <div className="absolute left-[45%] transform -translate-x-[45%] lg:-bottom-16 flex items-center  ">
          <div className="text-center mr-10 lg:hidden">
            <h2 className="text-sm font-bold">{user.followers} M</h2>
            <p className="text-gray-500 text-xs">Followers</p>
          </div>
          <img
            className="lg:w-[150px] lg:h-[150px] lg:ml-24  rounded-full border-4 border-white -mt-14"
            src={user.profilePicture}
            alt={user.username}
          />
          <div className="text-center ml-10 lg:hidden">
            <h2 className="text-sm font-bold">{user.likes} M</h2>
            <p className="text-gray-500 text-xs">Likes</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center md:justify-between lg:mt-20 mt-10">
        <div className="flex flex-col justify-center items-center text-center lg:gap-2">
          <h1 className="text-2xl font-bold font-balsamiq">{user.username}</h1>
          <h3>J. Hello Guys</h3>
          <p className="text-sm text-gray-500 mb-3">
            Follow me and like my post
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex gap-5">
          <button className="w-[150px] px-4 py-2 bg-pastel text-white rounded-md">
            Follow
          </button>
          <button className="w-[150px] px-4 py-2 bg-pastel text-white rounded-md">
            Messages
          </button>
        </div>
      </div>
      <div className=" hidden lg:flex justify-center space-x-8 mt-4 ">
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.followers} M</h2>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.likes} M</h2>
          <p className="text-gray-500">Likes</p>
        </div>
      </div>
      <div className="flex justify-center space-x-8 mt-8">
        <button className="pb-2 border-b-2 border-red-500 text-red-500">
          Photos
        </button>
        <button className="pb-2 text-gray-500">Videos</button>
        <button className="pb-2 text-gray-500">Album</button>
        <button className="pb-2 text-gray-500">Tag</button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {user.posts && user.posts.length > 0 ? (
          user.posts.map((post, index) => (
            <img
              key={index}
              src={post.postPicture}
              alt={`Post ${index + 1}`}
              className="w-full h-64 object-cover rounded-md"
            />
          ))
        ) : (
          <p>No hay fotos disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

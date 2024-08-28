import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";

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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <SideBar />
      <div className="flex flex-col md:flex-row items-center justify-between md:space-x-8">
        <div className="flex items-center space-x-4">
          <img
            className="w-32 h-32 rounded-full"
            src={user.postPicture}
            alt={user.username}
          />
          <div className="flex flex-col items-center pl-10">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <h3 className="">J. Hello Guys</h3>
            <p className="text-sm text-gray-500">Follow me and like my post</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">
            Follow
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
            Messages
          </button>
        </div>
      </div>

      <div className="flex justify-center md:justify-start space-x-8 mt-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.followers} M</h2>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.likes} M</h2>
          <p className="text-gray-500">Likes</p>
        </div>
      </div>

      <div className="flex justify-center space-x-8 mt-8 border-b">
        <button className="pb-2 border-b-2 border-red-500 text-red-500">
          Photos
        </button>
        <button className="pb-2 text-gray-500">Videos</button>
        <button className="pb-2 text-gray-500">Album</button>
        <button className="pb-2 text-gray-500">Tag</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        <img
          src={user.postPicture}
          alt={user.username}
          className="w-full rounded-md"
        />
        <img
          src={user.postPicture}
          alt={user.username}
          className="w-full rounded-md"
        />
        <img
          src={user.postPicture}
          alt={user.username}
          className="w-full rounded-md"
        />
        <img
          src={user.postPicture}
          alt={user.username}
          className="w-full rounded-md"
        />
      </div>
    </div>
  );
}

export default UserProfile;

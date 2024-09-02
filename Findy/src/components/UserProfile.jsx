import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";
import atras from "/icons/atras.svg";
import { Link } from "react-router-dom";
function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("Photos");

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

  const handleFollowClick = () => {
    if (user) {
      const newFollowersCount = isFollowing
        ? user.followers - 1
        : user.followers + 1;
      setUser({ ...user, followers: newFollowersCount });
      setIsFollowing(!isFollowing);

      localStorage.setItem(`following_${userId}`, !isFollowing);
    }
  };
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div>Cargando...</div>;
  }

  const coverPhoto = user.posts.find((post) => post.postId === 2);
  const filteredPosts = user.posts.filter((post) => {
    if (activeTab === "Photos") {
      return post.postPicture;
    } else if (activeTab === "Videos") {
      return post.postVideoPicture;
    }
    return false;
  });
  return (
    <div className="lg:w-[90%] lg:ml-[20%] lg:p-1 font-balsamiq w-full max-w-screen-xl">
      <SideBar />
      <div className="relative">
        <div className="fixed lg:hidden w-full items-center">
          <div className="flex justify-between items-center m-2">
            <div className="">
              <Link to="/layout">
                <img src={atras} alt={"atras"} />
              </Link>
            </div>
            <div>
              <p className="text-4xl leading-none mt-[-25px]">...</p>
            </div>
          </div>
        </div>
        <img
          className="lg:w-full lg:h-[500px] w-full h-[300px]"
          src={coverPhoto ? coverPhoto.postPicture : "/default-cover.png"}
          alt={`${user.username}`}
        />
        <div className="absolute lg:-bottom-16 flex items-center w-[100%] justify-center">
          <div className="text-center mr-[20px] lg:hidden">
            <h2 className="text-sm font-bold lg:mt-0 mt-2">{user.followers}</h2>
            <p className="text-gray-500 text-xs">Followers</p>
          </div>
          <img
            className="lg:w-[150px] lg:h-[150px] rounded-full border-4 border-white -mt-14"
            src={user.profilePicture}
            alt={user.username}
          />
          <div className="text-center ml-10 lg:hidden">
            <h2 className="text-sm font-bold max-w-20 lg:mt-0 mt-2">
              {user.likes}
            </h2>
            <p className="text-gray-500 text-xs">Likes</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center md:justify-between lg:mt-20 mt-12 ">
        <div className="flex flex-col justify-center items-center text-center lg:gap-2">
          <h1 className="text-2xl font-bold font-balsamiq">{user.username}</h1>
          <h3>J. Hello Guys</h3>
          <p className="text-smmb-3 mb-3">Follow me and like my post</p>
        </div>

        <div className="mt-4 md:mt-0 flex gap-5">
          <button
            onClick={handleFollowClick}
            className="w-[150px] px-4 py-2 bg-pastel text-white rounded-md"
          >
            {isFollowing ? "Followed" : "Follow"}
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
      <div className="bg-white lg:bg-white rounded-[45px] p-4 mt-8  mb-20">
        <div className="flex justify-center space-x-8">
          <button
            className={`pb-2 ${
              activeTab === "Photos"
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Photos")}
          >
            Photos
          </button>
          <button
            className={`pb-2 ${
              activeTab === "Videos"
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Videos")}
          >
            Videos
          </button>
          <button className="pb-2 text-gray-500">Album</button>
          <button className="pb-2 text-gray-500">Tag</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <Link
                key={index}
                to={`/profile/${userId}/post/${post.postId}`}
                state={{ activeSection: activeTab }}
              >
                <img
                  src={
                    activeTab === "Photos"
                      ? post.postPicture
                      : post.postVideoPicture
                  }
                  alt={`Post ${index + 1}`}
                  className="w-full h-64 object-cover rounded-md"
                />
              </Link>
            ))
          ) : (
            <p>
              No hay {activeTab === "Videos" ? "videos" : "fotos"} disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

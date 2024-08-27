  import { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import iconNoti from "/icons/heart.svg";
  import iconComentario from "/icons/comentario.svg";
  import iconResponse from "/icons/responses.svg";

  function MainContent() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchUsers = fetch(
        "https://fake-api-eight-gilt.vercel.app/users"
      ).then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener los usuarios: ${response.status}`);
        }
        return response.json();
      });

      Promise.all([fetchUsers])
        .then(([usersData]) => {
          const filteredUsers = usersData.filter(
            (user) => user.profilePicture && user.postPicture
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
      <div className="flex flex-col items-center w-[500px] max-w-screen-lg mx-auto p-4 font-balsamiq">
        {/* Stories Section */}
        <div className="mb-8 flex overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4">
            {users.map((user) => (
              <div key={user.id} className="flex-shrink-0 text-center">
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-16 h-16 rounded-full border-2 border-pink-500 p-1 object-cover"
                />
                <p className="mt-2 text-sm text-gray-700">{user.username}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Posts Section */}
        <div className=" w-full">
          <div className="grid grid-cols-1 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 border rounded-lg shadow-md"
              >
                <Link
                to={`/profile/${user.id}`}
                className="mb-4 text-lg font-semibold text-gray-700"
              >
                {user.username}
              </Link>
                <h1 className="mb-4 text-lg font-semibold text-gray-700">
                </h1>
                <img
                  src={user.postPicture}
                  alt={user.username}
                  className="w-full h-[30rem] rounded-lg object-cover mb-4"
                />
                <div className="flex p-2 items-start gap-2">
                  <div className="flex flex-col space-x-2">
                    <img className="w-6 h-6" src={iconNoti} alt="Likes" />
                    <p className="text-sm text-gray-700">{user.likes?.length}</p>
                  </div>
                  <div className="flex flex-col space-x-2">
                    <img
                      className="w-6 h-6"
                      src={iconComentario}
                      alt="Comments"
                    />
                    <p className="text-sm text-gray-700">
                      {user.comments?.length}
                    </p>
                  </div>
                  <div className="flex flex-col space-x-2">
                    <img className="w-6 h-6" src={iconResponse} alt="Comments" />
                    <p className="text-sm text-gray-700">
                      {user.responses?.length}
                    </p>
                  </div>
                </div>
                <p className="p-2 text-sm text-gray-700">
                  <span className="font-bold text-[20px]">{user.username}, </span>
                  {user.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  export default MainContent;

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

  const coverPhoto = user.posts.find(post => post.postId === 2);

  return (
    <div className="max-w-6xl ml-[261px] p-1">
      <SideBar />
      
       {/* Foto de Portada */}
       <div className="relative">
        <img
          className="w-full"  // Clase para la foto de portada
          src={coverPhoto ? coverPhoto.postPicture : "/default-cover.png"}  // Usa la foto de portada encontrada
          alt={`${user.username} Cover`}
        />
        
        {/* Foto de Perfil */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
          <img
            className="w-32 h-32 rounded-full border-4 border-white"  // Foto de perfil centrada y con borde
            src={user.profilePicture}
            alt={user.username}
          />
        </div>
      </div>
  
      {/* Información del Usuario */}
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between md:space-x-8 mt-20">
        <div className="flex flex-col justify-center items-center ml-[390px] pl-10 text-center md:text-left">
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <h3 className="">J. Hello Guys</h3>
          <p className="text-sm text-gray-500">Follow me and like my post</p>
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
  
      {/* Sección de Seguidores y Me Gusta */}
      <div className="flex justify-center space-x-8 mt-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.followers} M</h2>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.likes} M</h2>
          <p className="text-gray-500">Likes</p>
        </div>
      </div>
  
      {/* Sección de Navegación para Filtrar Contenido */}
      <div className="flex justify-center space-x-8 mt-8 border-b">
        <button className="pb-2 border-b-2 border-red-500 text-red-500">
          Photos
        </button>
        <button className="pb-2 text-gray-500">Videos</button>
        <button className="pb-2 text-gray-500">Album</button>
        <button className="pb-2 text-gray-500">Tag</button>
      </div>
  
      {/* Galería de Imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
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

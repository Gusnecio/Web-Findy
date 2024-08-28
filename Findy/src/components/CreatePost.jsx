import React, { useState, useEffect } from "react";

const CreatePostForm = () => {
  const [user, setUser] = useState(null);
  const [postPicture, setPostPicture] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Reemplaza con el ID del usuario apropiado
    const userId = 1;

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://fake-api-eight-gilt.vercel.app/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Error fetching user data.");
      }
    };

    fetchUser();
  }, []);

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostPicture(file);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError("User data is not available.");
      return;
    }

    if (!postPicture || !description) {
      setError("Please provide both a picture and a description.");
      return;
    }

    // Generar un nuevo postId
    const newPostId = user.posts.length
      ? Math.max(user.posts.map((post) => post.postId)) + 1
      : 1;

    // Aquí debes subir la imagen a un servidor y obtener la URL de la imagen
    // Aquí solo usaremos una URL ficticia para la demostración
    const imageUrl = "/posts/your-image-url.png";

    // Preparar el nuevo post
    const newPost = {
      postId: newPostId,
      postPicture: imageUrl, // Cambia esto por la URL de la imagen subida
      description,
      date: new Date().toISOString().split("T")[0], // Fecha actual
    };

    // Añadir el nuevo post a los posts existentes
    const updatedPosts = [...user.posts, newPost];

    try {
      const response = await fetch(
        `https://fake-api-eight-gilt.vercel.app/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ posts: updatedPosts }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();
      setSuccess("Post created successfully!");
      setDescription("");
      setPostPicture("");
      setError(null);
      console.log("Post created:", result);
    } catch (error) {
      setError("Error creating post: " + error.message);
      console.error("Error:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <div>
        <label htmlFor="postPicture">Post Picture:</label>
        <input
          type="file"
          id="postPicture"
          onChange={handlePictureChange}
          accept="image/*"
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <button type="submit">Create Post</button>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </form>
  );
};

export default CreatePostForm;

import { useState, useEffect } from "react";

const CreatePostForm = () => {
  const [user, setUser] = useState(null);
  const [postPictureUrl, setPostPictureUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
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

  const handlePictureUrlChange = (event) => {
    setPostPictureUrl(event.target.value);
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

    if (!postPictureUrl || !description) {
      setError("Please provide both a picture URL and a description.");
      return;
    }

    const newPostId = user.posts.length
      ? Math.max(user.posts.map((post) => post.postId)) + 1
      : 1;

    const newPost = {
      postId: newPostId,
      postPicture: postPictureUrl,
      description,
      date: new Date().toISOString().split("")[0],
    };

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
      setPostPictureUrl("");
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
        <label htmlFor="postPictureUrl">Post Picture URL:</label>
        <input
          type="text"
          id="postPictureUrl"
          value={postPictureUrl}
          onChange={handlePictureUrlChange}
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

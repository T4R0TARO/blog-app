import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";

const DeletePost = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);

  const handleDeletePost = async (ev) => {
    ev.preventDefault();
    try {
      const response = await fetch(
        // TEST URL: http://localhost:3000/api/v1/auth/delete/
        `https://blog-app-production-82fa.up.railway.app/api/v1/auth/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setRedirect(true);
      }
    } catch (error) {
      console.log("Error delete post:", error.message);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="delete-page-container">
      <h1>Delete Post</h1>
      <div className="confirm-delete-container">
        <h3>Are you sure you want to delete this post?</h3>
        <button className="confirm-delete-btn" onClick={handleDeletePost}>
          Yes, Delete it.
        </button>
      </div>
    </div>
  );
};

export default DeletePost;

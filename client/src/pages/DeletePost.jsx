import { useParams } from "react-router-dom";

const DeletePost = () => {
  const { id } = useParams();

  const handleDeletePost = () => {
    return console.log("delete post...");
  };
  return (
    <div className="delete-page-container">
      <h1>Delete Post</h1>
      {id}
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

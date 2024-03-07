import { useParams } from "react-router-dom";

const DeletePost = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Delete Post Page</h1>
      {id}
    </div>
  );
};

export default DeletePost;

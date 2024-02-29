import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/auth/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(postInfo);
  return (
    <div>
      <h1>post page here...</h1>
    </div>
  );
};

export default PostPage;

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
  if (!postInfo) return "";
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="image">
        <img src={`http://localhost:3000/${postInfo.cover}`} alt="" />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      {/* {postInfo.content} */}
    </div>
  );
};

export default PostPage;

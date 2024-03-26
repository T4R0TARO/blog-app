import { useEffect, useState } from "react";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const domainName = "https://blog-app-client-production.up.railway.app/";
  // TEST URL: http://localhost:3000/api/v1/auth/post
  useEffect(() => {
    fetch(
      "https://blog-app-client-production.up.railway.app/api/v1/auth/post"
    ).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
};

export default Home;

import { useEffect, useState } from "react";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/auth/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        // console.log(posts);
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

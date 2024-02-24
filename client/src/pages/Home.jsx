import { useEffect } from "react";
import Post from "../components/Post";

const Home = () => {
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/auth/post").then((response) => {
      response.json().then((posts) => {
        console.log(posts);
      });
    });
  }, []);
  return (
    <>
      <Post />
      <Post />
      <Post />
    </>
  );
};

export default Home;

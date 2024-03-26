import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
// TODO: Update URL to Custom Domain name
const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    // TEST URL: http://localhost:3000/api/v1/auth/profile
    fetch(
      "https://blog-app-production-82fa.up.railway.app/api/v1/auth/profile",
      {
        credentials: "include",
      }
    ).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    console.log("logout");
    // TEST URL: http://localhost:3000/api/v1/auth/logout
    fetch(
      "https://blog-app-production-82fa.up.railway.app/api/v1/auth/logout",
      {
        credentials: "include",
        method: "POST",
      }
    );
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

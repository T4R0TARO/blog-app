import { useState } from "react";
import { Navigate } from "react-router-dom";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function login(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
    if (response.ok) {
      setRedirect(true);
    } else {
      alert("wrong credentials...");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginPage;

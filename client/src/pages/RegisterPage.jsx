import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(event) {
    event.preventDefault();
    // TEST URL: http://localhost:3000/api/v1/auth/register
    const response = await fetch(
      "https://blog-app-production-82fa.up.railway.app/api/v1/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    // TODO: Temp error message...
    if (response.status === 200) {
      alert("registration success 🚀");
    } else {
      alert("registration failed...😔");
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
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
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;

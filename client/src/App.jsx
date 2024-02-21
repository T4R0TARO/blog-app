import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;

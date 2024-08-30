import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import UserProfile from "../components/UserProfile.jsx";
import PostDetail from "../components/PostDetail.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/profile/:userId/post/:postId" element={<PostDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

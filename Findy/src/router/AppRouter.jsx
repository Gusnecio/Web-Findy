import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Login from "../components/Login";
import Register from "../components/Register"; 

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

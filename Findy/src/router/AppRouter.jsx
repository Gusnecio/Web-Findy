import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
<<<<<<< HEAD
import Login from "../components/Login";
import Register from "../components/Register"; 
=======
>>>>>>> 74d764f250f8c994cbfae8445fef0ee166e4a065

const AppRouter = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
        </Route>
=======
        <Route path="/" element={<Layout />}></Route>
>>>>>>> 74d764f250f8c994cbfae8445fef0ee166e4a065
      </Routes>
    </Router>
  );
};

export default AppRouter;

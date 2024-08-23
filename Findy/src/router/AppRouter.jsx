import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

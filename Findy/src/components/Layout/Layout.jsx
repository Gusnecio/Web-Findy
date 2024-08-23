import { Outlet, } from "react-router-dom";
// import NavBar from "../NavBar";
import "../../index.css";

const Layout = () => {


  return (
    <div
    
    >
      {/* <NavBar /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
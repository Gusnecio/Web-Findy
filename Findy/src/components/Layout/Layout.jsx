import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import NavBar from "./NavBar";
=======
import SideBar from "../SideBar";
import MainContent from "../MainContent";
import RightPanel from "../RightPanel";
>>>>>>> 74d764f250f8c994cbfae8445fef0ee166e4a065
import "../../index.css";

const Layout = () => {
  return (
    <div className="flex justify-between">
      <div>
        <SideBar />
      </div>

      <MainContent>
        <Outlet />
      </MainContent>
      <RightPanel />
    </div>
  );
};

export default Layout;

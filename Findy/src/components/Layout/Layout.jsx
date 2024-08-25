import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
import MainContent from "../MainContent";
import RightPanel from "../RightPanel";
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

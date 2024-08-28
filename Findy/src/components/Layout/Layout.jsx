import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
import MainContent from "../MainContent";
import "../../index.css";

const Layout = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
import MainContent from "../MainContent";
import { AppProvider } from "../Context";
import "../../index.css";

const Layout = () => {
  return (
    <div className="flex-1 flex flex-col">
      <AppProvider>
        <SideBar />
        <MainContent>
          <Outlet />
        </MainContent>
      </AppProvider>
    </div>
  );
};

export default Layout;

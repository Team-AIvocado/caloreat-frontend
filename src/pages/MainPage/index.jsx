import { Outlet } from "react-router-dom";
import { MainNavBar } from "../../components/Navbar/MainNavbar";
import { useAuth } from "../../context/AuthContext";

export const MainPage = () => {
  const { user, userInfo } = useAuth();

  return (
    <div>
      <MainNavBar nickname={userInfo?.nickname || user?.nickname || ""} />
      <div className="ml-52 pb-0">
        <Outlet />
      </div>
    </div>
  );
};

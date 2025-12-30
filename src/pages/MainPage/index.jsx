import { Outlet } from "react-router-dom";
import { MainNavBar } from "../../components/Navbar/MainNavbar";
import { useAuth } from "../../context/AuthContext";

export const MainPage = () => {
  const { user, userInfo } = useAuth();

  return (
    <div className="min-h-screen bg-main_background">
      <MainNavBar nickname={userInfo?.nickname || user?.nickname || ""} />
      <div className="md:ml-52 pt-16 md:pt-0 pb-24 md:pb-0">
        <Outlet />
      </div>
    </div>
  );
};

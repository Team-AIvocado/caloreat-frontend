import { Outlet } from "react-router-dom";
import { MainNavBar } from "../../components/Navbar/MainNavbar";
import { useAuth } from "../../context/AuthContext";

export const MainPage = () => {
  const { user, userInfo } = useAuth();

  return (
    <div>
      <MainNavBar nickname={userInfo?.nickname || user?.nickname || ""} />
      <div className="ml-52 pb-0">
        <div className="fixed bottom-2 right-2 text-xs text-gray-400">
          Deploy v1.1
        </div>
        <Outlet />
      </div>
    </div>
  );
};

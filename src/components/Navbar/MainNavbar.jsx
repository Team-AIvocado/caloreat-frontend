import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/users";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";
import { alertBtn } from "../../utils/styles";

export const MainNavBar = ({ nickname }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { showAlert, closeAlert } = useAlert();

  const handleConfirmAndNavigate = () => {
    closeAlert();
    setUser(null);
    navigate("/");
  };

  const onLogout = async () => {
    try {
      await logout();
      showAlert({
        msg: "로그아웃 완료!",
        hasNavbar: true,
        footer: (
          <button className={alertBtn} onClick={handleConfirmAndNavigate}>
            확인
          </button>
        ),
      });
    } catch {
      console.log("failed to logout");
    }
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white h-16 flex items-center justify-between px-6 z-50 border-b border-border_color">
        <div
          className="text-main_color font-bold text-xl cursor-pointer flex flex-col leading-tight"
          onClick={() => navigate("/main/dashboard")}
        >
          <span className="text-lg font-medium">{nickname}'s</span>
          <span>caloreat</span>
        </div>
        <button
          onClick={onLogout}
          className="text-xs text-main_color underline focus:outline-none"
        >
          로그아웃
        </button>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white h-16 flex items-center justify-around z-50 border-t border-border_color px-2">
        <NavItem to="/main/dashboard" label="홈" />
        <NavItem to="/main/log" label="로그" />
        <NavItem to="/main/statistics" label="통계" />
        <NavItem to="/main/setting" label="설정" />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 bg-white h-full w-52 border-r border-border_color flex-col pt-10 z-30">
        <div
          className="text-main_color text-3xl ml-11 mt-20 mb-10 cursor-pointer"
          onClick={() => navigate("/main/dashboard")}
        >
          <div className="text-end pr-8">{nickname}'s</div>
          <div className="pr-16 pb-0.5 font-bold">caloreat</div>
          <div className="text-end pr-5">
            <span
              className="text-xs cursor-pointer text-main_color underline"
              onClick={(e) => {
                e.stopPropagation();
                onLogout();
              }}
            >
              로그아웃
            </span>
          </div>
        </div>
        <nav className="flex flex-col">
          <NavItem to="/main/dashboard" label="홈" vertical />
          <NavItem to="/main/log" label="로그" vertical />
          <NavItem to="/main/statistics" label="통계" vertical />
          <NavItem to="/main/setting" label="설정" vertical />
        </nav>
      </div>
    </>
  );
};

const NavItem = ({ to, label, vertical, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `${
        vertical
          ? "text-end pr-14 py-4"
          : "flex flex-col items-center justify-center text-sm py-1"
      } 
       ${isActive ? "font-semibold text-main_color" : "text-secondary_text"}`
    }
  >
    {label}
  </NavLink>
);

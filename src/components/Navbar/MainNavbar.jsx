import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/users";

export const MainNavBar = ({ nickname }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    //TODO: logout 되었습니다. modal 창
    navigate("/");
  };

  return (
    <>
      <div className="flex fixed top-0 bg-white h-full w-52">
        <div className="flex fixed text-sm left-0 w-52 bg-white flex-col pt-10 ">
          <div className="text-main_color text-3xl ml-11 mt-20">
            <div className="text-end pr-8">{nickname}'s</div>
            <div className="pr-16 pb-0.5 font-bold">caloreat</div>
            <div className="text-end pr-5 pb-5">
              <span
                className="text-xs cursor-pointer text-main_color "
                onClick={onLogout}
              >
                로그아웃
              </span>
            </div>
          </div>
          <NavItem to="/main/dashboard" label="홈" vertical />
          <NavItem to="/main/log" label="로그" vertical />
          <NavItem to="/main/statistics" label="통계" vertical />
          <NavItem to="/main/setting" label="설정" vertical />
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex-1 text-end pr-14 py-4
       ${isActive ? "font-semibold text-blue-600" : "text-gray-600"}`
    }
  >
    {label}
  </NavLink>
);

import { NavLink } from "react-router-dom";

export const MainNavBar = () => {
  return (
    <>
      <div className="flex fixed top-0 bg-white h-full w-52">
        <div className="flex fixed text-sm left-0 w-52 bg-white flex-col pt-10 ">
          <div className="text-main_color text-3xl ml-11 mt-20">
            <div className="pr-16 pb-7 font-bold">caloreat</div>
          </div>
          <NavItem to="/main" label="홈" vertical />
          <NavItem to="/log" label="로그" vertical />
          <NavItem to="/statistics" label="통계" vertical />
          <NavItem to="/setting" label="설정" vertical />
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
       ${isActive ? "font-bold text-blue-600" : "text-gray-600"}`
    }
  >
    {label}
  </NavLink>
);

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";
import { alertBtn } from "../../utils/styles";

export const MainNavBar = ({ nickname }) => {
  const navigate = useNavigate();
  const { setUser, logout } = useAuth();
  const { showAlert, closeAlert } = useAlert();
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmAndNavigate = () => {
    closeAlert();
    // setUser(null); // AuthContext already does this
    navigate("/");
  };

  const onLogout = async () => {
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
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white h-16 flex items-center justify-between px-6 z-50 border-b border-border_color">
        <div
          className="text-main_color font-bold text-xl cursor-pointer"
          onClick={() => navigate("/main/dashboard")}
        >
          caloreat
        </div>
        <button
          onClick={toggleMenu}
          className="text-main_color focus:outline-none"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-20 px-6">
          <div className="text-main_color text-2xl mb-8">
            <div className="font-bold">{nickname}'s</div>
            <div className="font-bold">caloreat</div>
            <div className="mt-2">
              <span
                className="text-xs cursor-pointer text-main_color underline"
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
              >
                로그아웃
              </span>
            </div>
          </div>
          <nav className="flex flex-col space-y-4">
            <NavItem
              to="/main/dashboard"
              label="홈"
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/main/log"
              label="로그"
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/main/statistics"
              label="통계"
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/main/setting"
              label="설정"
              onClick={() => setIsOpen(false)}
            />
          </nav>
        </div>
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
      `${vertical ? "text-end pr-14 py-4" : "text-left py-2 text-lg"} 
       ${isActive ? "font-semibold text-main_color" : "text-secondary_text"}`
    }
  >
    {label}
  </NavLink>
);

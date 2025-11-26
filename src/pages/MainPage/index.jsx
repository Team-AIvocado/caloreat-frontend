import { Outlet } from "react-router-dom";
import { MainNavBar } from "../../components/Navbar/MainNavbar";
import { useEffect, useState } from "react";
import { getUser, login } from "../../services/users";

export const MainPage = () => {
  const [nickname, setNickname] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loginUser = await getUser();
        // console.log("success to fetch user", loginUser);
        setNickname(loginUser.nickname);
      } catch (e) {
        console.log("failed to fetch user", e);
      }
    };

    fetchUser();
  }, []);
  return (
    <div>
      <MainNavBar nickname={nickname} />
      <div className="ml-52 pb-0">
        <Outlet />
      </div>
    </div>
  );
};

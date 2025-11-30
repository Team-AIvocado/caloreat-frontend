import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, getUserInfo, login, logout } from "../../services/users";
import { LoginComp } from "./layout/LoginComp";
import { OnLogin } from "./layout/OnLogin";

export const LoginPage = () => {
  const [loginUser, setLoginUser] = useState({ user: "", userinfo: "" });
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ id: false, pw: false });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user) {
          setLoginUser({ ...loginUser, user: user.username });
        }
      } catch {
        setLoginUser({ ...loginUser, user: "" });
        console.log("failed to get user");
      }
    };
    fetchUser();
  }, []);

  const onSignup = () => {
    navigate("/signup");
  };

  const checkPreInfo = async () => {
    try {
      const checkUserInfo = await getUserInfo();
      return checkUserInfo ? checkUserInfo.user_id : null;
    } catch {
      console.log("failed to get user info");
      return null;
    }
  };

  //TODO: 존재하지 않는 id라면 modal창 출력
  const onMain = async () => {
    if (!userId.trim()) {
      setError({ ...error, id: true });
      return;
    } else setError({ ...error, id: false });
    if (!password.trim()) {
      setError({ ...error, pw: true });
      return;
    } else setError({ ...error, pw: false });

    try {
      const response = await login(userId, password);
      console.log("login success", response);
      const userInfoId = await checkPreInfo();

      console.log("UserInfo ID:", userInfoId);

      if (userInfoId) {
        navigate("/main/dashboard");
      } else {
        navigate("/userinfo");
      }
    } catch (e) {
      console.error("login failure", e.status);
      if (e.status == 401) {
        alert("비밀번호가 일치하지 않습니다.");
      } else if (e.status == 400) {
        alert("존재하지 않는 사용자입니다.");
        setUserId("");
        setPassword("");
      }
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col justify-center items-center">
        <div className="text-main_color text-3xl ml-11">
          <div className="pr-16 pb-7 font-bold">caloreat</div>
        </div>
        {loginUser.user ? (
          <LoginComp logout={logout} setLoginUser={setLoginUser} />
        ) : (
          <OnLogin
            error={error}
            userId={userId}
            setUserId={setUserId}
            setError={setError}
            password={password}
            setPassword={setPassword}
            onMain={onMain}
            onSignup={onSignup}
          />
        )}
      </div>
    </>
  );
};

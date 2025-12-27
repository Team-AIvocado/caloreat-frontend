import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoginComp } from "./layout/LoginComp";
import { OnLogin } from "./layout/OnLogin";
import { useAlert } from "../../context/AlertContext";
import { alertBtn } from "../../utils/styles";

export const LoginPage = () => {
  const { login, logout, user, userInfo, loading } = useAuth();
  const { showAlert, closeAlert } = useAlert();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ id: false, pw: false });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // OAuth 에러 처리 (뒤로가기 등으로 인한 state 불일치)
  useEffect(() => {
    const oauthError = searchParams.get("error");
    if (oauthError === "oauth_failed") {
      showAlert({
        msg: "다시 로그인해주세요.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
      // 쿼리 파라미터 제거
      setSearchParams({});
    }
  }, [searchParams]);

  const onSignup = () => {
    navigate("/signup");
  };

  //TODO: 로그인 성공시 main or userinfo로 강제 라우팅 해버리기 (App.jsx에서 해야 할 수도)
  const onMain = async () => {
    if (!userId.trim()) {
      setError({ ...error, id: true });
      return;
    } else setError({ ...error, id: false });
    if (!password.trim()) {
      setError({ ...error, pw: true });
      return;
    } else setError({ ...error, pw: false });

    setIsLoggingIn(true);

    try {
      const response = await login(userId, password);
      console.log("login success", response);

      if (response.userInfoData) {
        navigate("/main/dashboard");
      } else {
        navigate("/userinfo");
      }
    } catch (e) {
      console.error("login failure", e.status);
      if (e.status == 401) {
        showAlert({
          msg: "비밀번호가 일치하지 않습니다.",
          footer: (
            <button className={alertBtn} onClick={closeAlert}>
              확인
            </button>
          ),
        });
      } else if (e.status == 400) {
        showAlert({
          msg: "존재하지 않는 사용자입니다.",
          footer: (
            <button className={alertBtn} onClick={closeAlert}>
              확인
            </button>
          ),
        });
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center items-center bg-main_background px-4">
        <div className="text-main_color text-3xl mb-8">
          <div className="font-bold text-center">caloreat</div>
        </div>

        {loading || isLoggingIn ? (
          <div className="text-gray-400">로딩중입니다...</div>
        ) : (
          <>
            {user ? (
              <LoginComp
                logout={logout}
                nickname={user.nickname}
                userInfo={userInfo}
              />
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
          </>
        )}
      </div>
    </>
  );
};

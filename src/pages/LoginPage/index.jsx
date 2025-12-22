import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="flex h-screen flex-col bg-main_background px-4 max-w-[600px] mx-auto relative">
        {/* 중앙 콘텐츠 (로고 + 로그인 폼) - flex-1과 justify-center로 화면 정중앙 배치 */}
        <div className="flex-1 flex flex-col justify-center items-center w-full">
          <div className="text-main_color text-3xl mb-12">
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
          {/* 회원가입 링크 - 로그인 폼 바로 아래 배치 */}
          {/* 회원가입 링크 - 로그인 폼 바로 아래 배치 */}
          {!user && !loading && !isLoggingIn && (
            <div className="w-full text-center mt-6">
              <div className="text-sm text-secondary_text dark:text-gray-400">
                <span>아직 회원이 아니라면?</span>{" "}
                <span
                  className="text-gray-900 dark:text-white cursor-pointer underline ml-2 font-medium"
                  onClick={onSignup}
                >
                  회원가입
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
};

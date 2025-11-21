import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ id: false, pw: false });

  const sty = [
    "border focus:ring-1 focus:outline-none focus:border-main_color border-border_color text-sm pl-2 pr-11 py-3",
    "border focus:ring-1 focus:outline-none focus:border-red-500 border-border_color text-sm pl-2 pr-11 py-3 ",
  ];

  const navigate = useNavigate();

  const onSignup = () => {
    navigate("/signup");
  };

  const onMain = () => {
    if (!username) {
      setError({ ...error, id: true });
      return;
    } else setError();
    if (!password) {
      setError({ ...error, pw: true });
    }

    navigate("/main");
  };

  return (
    <>
      <div className="flex h-screen flex-col justify-center items-center">
        <div className="text-main_color text-3xl">
          <div className="pr-16 pb-5 font-bold">caloreat</div>
        </div>
        <div className="flex flex-row ml-6">
          <div className="flex flex-col">
            <input
              className={sty[0]}
              type="text"
              placeholder="아이디 및 email을 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className={sty[0]}
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-main_color text-white rounded-lg ml-7 px-3 py-2 mt-20 text-sm"
              onClick={onMain}
            >
              로그인
            </button>
          </div>
        </div>

        <div className="text-xs mt-2">
          <span>아직 회원이 아니라면?</span>{" "}
          <span
            className="text-main_color cursor-pointer underline ml-1"
            onClick={onSignup}
          >
            회원가입
          </span>
        </div>
      </div>
    </>
  );
};

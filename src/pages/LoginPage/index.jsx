import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, test } from "../../services/users";

export const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ id: false, pw: false });

  const sty = [
    "border bg-white my-2 focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color text-sm pl-2 pr-11 py-3",
    "border bg-white my-2 focus:outline-none focus:ring-0 focus:border-red-500 border-red-500 text-sm pl-2 pr-11 py-3",
  ];

  const navigate = useNavigate();

  const onSignup = () => {
    navigate("/signup");
  };

  //TODO: 존재하지 않는 id라면 modal창 출력
  //TODO: 로그인한 사용자 정보 테이블에 사용자 아이디가 없다면 사전정보 입력 페이지로 이동
  // 사전 정보가 있다면 main으로 이동
  const onMain = async () => {
    if (!userId.trim()) {
      setError({ ...error, id: true });
      return;
    } else setError({ ...error, id: false });
    if (!password.trim()) {
      setError({ ...error, pw: true });
      return;
    } else setError({ ...error, pw: false });

    // test();
    try {
      const response = await login(userId, password);
      console.log("login success", response);
      navigate("/userinfo");
      // navigate("/main");
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
        <div className="flex flex-row ml-6">
          <div className="flex flex-col ml-10">
            <input
              className={error.id ? sty[1] : sty[0]}
              type="text"
              placeholder="이메일 및 아이디를 입력하세요"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setError({ ...error, id: false });
              }}
            />
            <input
              className={error.pw ? sty[1] : sty[0]}
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...error, pw: false });
              }}
            />
          </div>
          <div>
            <button
              className="bg-main_color text-white rounded-lg ml-7 px-3 py-2 mt-20 text-sm cursor-pointer"
              onClick={onMain}
            >
              로그인
            </button>
          </div>
        </div>

        <div className="text-xs mt-2 ml-2 ">
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

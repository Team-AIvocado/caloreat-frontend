import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpInput } from "./layout/SignUpInput";

export const SignUpPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dbCheck, setdbCheck] = useState({ email: false, id: false });

  const [error, setError] = useState({
    email: false,
    id: false,
    name: false,
    password: false,
    confirmPassword: false,
  });

  //입력칸에 대한 스타일 (error 스타일 적용)
  const sty = [
    "border bg-white my-2 focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color text-sm pl-2 pr-11 py-3",
    "border bg-white my-2 focus:outline-none focus:ring-0 focus:border-red-500 border-red-500 text-sm pl-2 pr-11 py-3",
  ];

  //중복확인 버튼
  const sty2 = [
    "bg-main_color text-white rounded-lg ml-3 h-7 mt-6 px-3 py-2 text-xs cursor-pointer",
    "bg-main_border text-gray-400 rounded-lg ml-3 h-7 mt-6 px-3 py-2 text-xs",
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,}$/;

  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/");
  };

  //TODO:사용자가 입력한 email 중복 확인
  //TODO:db연결 후 에러 작업 설정
  const onEmailCheck = () => {
    if (!userEmail.trim()) {
      setError({ ...error, email: "이메일을 입력해주세요" });
      return;
    } else if (!emailRegex.test(userEmail.trim())) {
      setError({ ...error, email: "정확한 이메일을 입력해주세요" });
      return;
    }
    setdbCheck({ ...dbCheck, email: true });
    setError({ ...error, email: false });
  };

  const onIdCheck = () => {
    //TODO:사용자가 입력한 id가 중복 확인
    if (!userId.trim()) {
      setError({ ...error, id: "아이디를 입력해주세요" });
      return;
    }
    setdbCheck({ ...dbCheck, id: true });
    setError({ ...error, id: false });
  };

  //TODO: 로그인한 사용자 정보 테이블에 사용자 아이디가 없다면 사전정보 입력 페이지로 이동
  // 사전 정보가 있다면 main으로 이동
  const SignUp = () => {
    if (!userEmail.trim()) {
      setError({ ...error, email: "이메일을 입력해주세요" });
      return;
    } else if (!dbCheck.email) {
      setError({ ...error, email: "이메일 중복확인을 실행해주세요" });
      return;
    } else {
      setError({ ...error, email: false });
    }

    if (!userId.trim()) {
      setError({ ...error, id: "아이디를 입력해주세요" });
      return;
    } else if (!dbCheck.id) {
      setError({ ...error, id: "아이디 중복확인을 실행해주세요" });
      return;
    } else {
      setError({ ...error, id: false });
    }

    if (!nickname.trim()) {
      setError({ ...error, name: "닉네임을 입력해주세요" });
      return;
    }

    if (!password.trim()) {
      setError({ ...error, password: "비밀번호를 입력해주세요" });
      return;
    } else if (!passwordRegex.test(password.trim())) {
      setError({
        ...error,
        password: "영문 숫자 포함 5자 이상으로 입력해주세요",
      });
      return;
    }

    if (!confirmPassword.trim()) {
      setError({
        ...error,
        confirmPassword: "비밀번호를 다시 한 번 입력해주세요",
      });
      return;
    } else if (password.trim() !== confirmPassword.trim()) {
      setError({
        ...error,
        confirmPassword: "입력한 비밀번호와 일치하지 않습니다.",
      });
      return;
    }

    //TODO:회원가입 완료 모달창 필요
    navigate("/");
  };

  return (
    <>
      <div className="flex h-screen flex-col justify-center items-center">
        <div className="text-main_color text-3xl">
          <div className="pb-10 font-bold">
            <span className="cursor-pointer" onClick={() => navigate("/")}>
              caloreat
            </span>
          </div>
        </div>
        <SignUpInput
          error={error}
          sty={sty}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          setError={setError}
          setdbCheck={setdbCheck}
          dbCheck={onEmailCheck}
          onEmailCheck={onEmailCheck}
          sty2={sty2}
          userId={userId}
          setUserId={setUserId}
          onIdCheck={onIdCheck}
          nickname={nickname}
          setNickName={setNickName}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />

        <div className="flex flex-row ml-24">
          <div className="text-xs mt-2 ml-20 ">
            <span>이미 회원이라면?</span>{" "}
            <span
              className="text-main_color cursor-pointer underline ml-1"
              onClick={onLogin}
            >
              로그인
            </span>
          </div>
          <button
            className="bg-main_color text-white rounded-lg ml-7 px-8 py-2 text-sm cursor-pointer"
            onClick={SignUp}
          >
            완료
          </button>
        </div>
      </div>
    </>
  );
};

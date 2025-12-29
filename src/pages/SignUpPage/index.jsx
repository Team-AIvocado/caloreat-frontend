import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpInput } from "./layout/SignUpInput";
import { checkemail, checkid, signUp } from "../../services/users";
import { alertBtn } from "../../utils/styles";
import { useAlert } from "../../context/AlertContext";

export const SignUpPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dbCheck, setdbCheck] = useState({ email: false, id: false });
  const { showAlert, closeAlert } = useAlert();

  const [error, setError] = useState({
    email: false,
    id: false,
    name: false,
    password: false,
    confirmPassword: false,
  });

  const [accessMessage, setAccessMessage] = useState({
    email: "",
    id: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,}$/;

  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/");
  };

  const handleConfirmAndNavigate = () => {
    closeAlert();
    navigate("/");
  };

  const onEmailCheck = async () => {
    if (!userEmail.trim()) {
      setError({ ...error, email: "이메일을 입력해주세요" });
      setAccessMessage({ ...accessMessage, email: "" });
      return;
    } else if (!emailRegex.test(userEmail.trim())) {
      setError({ ...error, email: "정확한 이메일을 입력해주세요" });
      setAccessMessage({ ...accessMessage, email: "" });
      return;
    }

    setError({ ...error, email: false });

    try {
      const resp_email = await checkemail(userEmail.trim());
      console.log("available email", resp_email);
      setdbCheck({ ...dbCheck, email: true });
      setAccessMessage({ ...accessMessage, email: "사용 가능한 email입니다" });
    } catch (e) {
      console.log("unavailable email", e);
      setAccessMessage({ ...accessMessage, email: "" });
      showAlert({
        msg: "이미 존재하는 이메일입니다.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
      return;
    }
  };

  const onIdCheck = async () => {
    if (!userId.trim()) {
      setError({ ...error, id: "아이디를 입력해주세요" });
      setAccessMessage({ ...accessMessage, id: "" });
      return;
    }
    setError({ ...error, id: false });

    try {
      const resp_id = await checkid(userId.trim());
      console.log("available id", resp_id);
      setdbCheck({ ...dbCheck, id: true });
      setAccessMessage({ ...accessMessage, id: "사용 가능한 아이디입니다" });
    } catch (e) {
      console.log("unavailable id", e);
      setAccessMessage({ ...accessMessage, id: "" });
      showAlert({
        msg: "이미 존재하는 아이디입니다.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
      return;
    }
  };

  const handleSignUp = async () => {
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
    } else if (nickname.length > 8) {
      setError({ ...error, name: "닉네임은 8자 이하로 입력해주세요" });
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

    try {
      const response = await signUp(
        userEmail.trim(),
        userId.trim(),
        nickname.trim(),
        password.trim()
      );
      console.log("success sign up", response.data);
      showAlert({
        msg: "회원가입 완료!",
        footer: (
          <button className={alertBtn} onClick={handleConfirmAndNavigate}>
            확인
          </button>
        ),
      });

      return response.data;
    } catch (e) {
      console.log("failed to signup", e.response.data.detail);
      return;
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center items-center bg-main_background py-10">
        <div className="text-main_color text-3xl">
          <div className="pb-10 font-bold">
            <span className="cursor-pointer" onClick={() => navigate("/")}>
              caloreat
            </span>
          </div>
        </div>
        <SignUpInput
          error={error}
          accessMessage={accessMessage}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          setError={setError}
          setAccessMessage={setAccessMessage}
          setdbCheck={setdbCheck}
          dbCheck={dbCheck}
          onEmailCheck={onEmailCheck}
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

        <div className="flex flex-col-reverse md:flex-row items-center md:ml-24 mt-8 md:mt-0 w-full md:w-auto">
          <div className="text-xs mt-4 md:mt-2 md:ml-20 text-center md:text-left whitespace-nowrap">
            <span>이미 회원이라면?</span>{" "}
            <span
              className="text-main_color cursor-pointer underline ml-1"
              onClick={onLogin}
            >
              로그인
            </span>
          </div>
          <button
            className="bg-main_color text-white rounded-lg md:ml-7 px-8 py-2 text-sm cursor-pointer w-72 md:w-auto focus:ring-2 focus:ring-sub_color focus:outline-none"
            onClick={handleSignUp}
          >
            완료
          </button>
        </div>
      </div>
    </>
  );
};

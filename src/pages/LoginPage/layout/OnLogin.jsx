import { errorInput } from "../../../utils/styles";

export const OnLogin = ({
  error,
  userId,
  setUserId,
  setError,
  password,
  setPassword,
  onMain,
  onSignup,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onMain();
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center md:ml-6">
        <div className="flex flex-col md:ml-10">
          <input
            className={error.id ? errorInput[1] : errorInput[0]}
            type="text"
            placeholder="이메일 및 아이디를 입력하세요"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setError({ ...error, id: false });
            }}
          />
          <input
            className={error.pw ? errorInput[1] : errorInput[0]}
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError({ ...error, pw: false });
            }}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="w-full md:w-auto flex justify-center">
          <button
            className="bg-main_color text-white rounded-lg md:ml-7 px-16 py-3 mt-4 md:mt-20 text-sm cursor-pointer w-72 md:w-auto whitespace-nowrap"
            onClick={onMain}
          >
            로그인
          </button>
        </div>
      </div>

      <div className="text-xs mt-4 md:mt-2 md:ml-2 text-center md:text-left w-full md:w-auto">
        <div className="inline-block whitespace-nowrap">
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

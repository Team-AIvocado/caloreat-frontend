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
      <div className="flex flex-col items-center justify-center w-full px-4">
        <div className="flex flex-col w-full max-w-sm">
          <input
            className={`${error.id ? errorInput[1] : errorInput[0]} mb-2`}
            type="text"
            placeholder="이메일 및 아이디를 입력하세요"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setError({ ...error, id: false });
            }}
          />
          <input
            className={`${error.pw ? errorInput[1] : errorInput[0]} mb-6`}
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
        <div className="w-full max-w-sm">
          <button
            className="bg-main_color text-white rounded-lg px-4 py-3 text-sm cursor-pointer w-full font-bold hover:bg-blue-600 transition-colors"
            onClick={onMain}
          >
            로그인
          </button>
        </div>
      </div>

    </>
  );
};

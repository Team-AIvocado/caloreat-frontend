import { errorInput } from "../../../utils/styles";
import { api } from "../../../api/axios";

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
  const handleGoogleLogin = async () => {
    try {
      const response = await api.get("/auth/google/login");
      window.location.href = response.data.url;
    } catch (e) {
      console.error("Google 로그인 실패", e);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const response = await api.get("/auth/kakao/login");
      window.location.href = response.data.url;
    } catch (e) {
      console.error("Kakao 로그인 실패", e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onMain();
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-col w-full">
          <input
            className={`${error.id ? errorInput[1] : errorInput[0]} !w-full`}
            type="text"
            placeholder="이메일 및 아이디를 입력하세요"
            value={userId}
            autoComplete="username"
            onChange={(e) => {
              setUserId(e.target.value);
              setError({ ...error, id: false });
            }}
          />
          <input
            className={`${error.pw ? errorInput[1] : errorInput[0]} !w-full`}
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError({ ...error, pw: false });
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-main_color text-white rounded-lg py-3 mt-4 text-sm cursor-pointer w-full whitespace-nowrap"
        >
          로그인
        </button>

        <div className="flex items-center w-full my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-xs text-gray-400">또는</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="flex gap-3 w-full">
          <button
            type="button"
            className="bg-white text-gray-700 border border-gray-300 rounded-lg py-3 text-sm cursor-pointer flex-1 whitespace-nowrap flex items-center justify-center gap-2 hover:bg-gray-50"
            onClick={handleGoogleLogin}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            className="bg-[#FEE500] text-[#000000D9] rounded-lg py-3 text-sm cursor-pointer flex-1 whitespace-nowrap flex items-center justify-center gap-2 hover:bg-[#F5DC00]"
            onClick={handleKakaoLogin}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path fill="#000000" d="M9 1C4.58 1 1 3.79 1 7.21c0 2.17 1.45 4.08 3.64 5.18-.16.58-.58 2.1-.67 2.43-.1.41.15.4.32.29.13-.09 2.09-1.42 2.94-2 .58.09 1.17.13 1.77.13 4.42 0 8-2.79 8-6.24S13.42 1 9 1z"/>
            </svg>
            카카오
          </button>
        </div>
      </form>

      <div className="text-xs mt-6 text-center">
        <span className="text-gray-500">아직 회원이 아니라면?</span>{" "}
        <span
          className="text-main_color cursor-pointer underline ml-1"
          onClick={onSignup}
        >
          회원가입
        </span>
      </div>
    </div>
  );
};

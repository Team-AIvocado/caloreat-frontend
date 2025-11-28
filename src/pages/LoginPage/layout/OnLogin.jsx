import { sty2 } from "../../../utils/styles";

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
  return (
    <>
      <div className="flex flex-row ml-6">
        <div className="flex flex-col ml-10">
          <input
            className={error.id ? sty2[1] : sty2[0]}
            type="text"
            placeholder="이메일 및 아이디를 입력하세요"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setError({ ...error, id: false });
            }}
          />
          <input
            className={error.pw ? sty2[1] : sty2[0]}
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
    </>
  );
};

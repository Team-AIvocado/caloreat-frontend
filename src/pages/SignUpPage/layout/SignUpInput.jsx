import { checkBtn, errorInput } from "../../../utils/styles";

export const SignUpInput = ({
  error,
  userEmail,
  setUserEmail,
  setError,
  setdbCheck,
  dbCheck,
  onEmailCheck,
  userId,
  setUserId,
  onIdCheck,
  nickname,
  setNickName,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-72 md:w-96">
        <div className="flex flex-row items-start">
          <div className="flex-1">
            <input
              className={`${
                error.email ? errorInput[1] : errorInput[0]
              } !w-full !pr-2`}
              type="text"
              placeholder="이메일을 입력하세요"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
                setError({ ...error, email: false });
                setdbCheck({ ...dbCheck, email: false });
              }}
            />
            {error.email && (
              <div className="ml-3 text-red-400 text-xs text-nowrap font-light">
                {error.email}
              </div>
            )}
          </div>
          <button
            className={`${
              dbCheck.email ? checkBtn[1] : checkBtn[0]
            } !mt-5 !ml-2 whitespace-nowrap `}
            onClick={onEmailCheck}
          >
            중복확인
          </button>
        </div>
        <div className="flex flex-row items-start">
          <div className="flex-1">
            <input
              className={`${
                error.id ? errorInput[1] : errorInput[0]
              } !w-full !pr-2`}
              type="text"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setError({ ...error, id: false });
                setdbCheck({ ...dbCheck, id: false });
              }}
            />
            {error.id && (
              <div className="ml-3 text-red-400 text-xs text-nowrap font-light">
                {error.id}
              </div>
            )}
          </div>
          <button
            className={`${
              dbCheck.id ? checkBtn[1] : checkBtn[0]
            } !mt-5 !ml-2 whitespace-nowrap`}
            onClick={onIdCheck}
          >
            중복확인
          </button>
        </div>
        <input
          className={`${error.name ? errorInput[1] : errorInput[0]} !w-full`}
          type="text"
          placeholder="서비스에서 사용할 닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => {
            setNickName(e.target.value);
            setError({ ...error, name: false });
          }}
        />
        {error.name && (
          <div className="ml-3 text-red-400 text-xs text-nowrap font-light">
            {error.name}
          </div>
        )}
        <input
          className={`${
            error.password ? errorInput[1] : errorInput[0]
          } !w-full`}
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError({ ...error, password: false });
          }}
        />
        {error.password && (
          <div className="ml-3 text-red-400 text-xs text-nowrap font-light">
            {error.password}
          </div>
        )}
        <input
          className={`${
            error.confirmPassword ? errorInput[1] : errorInput[0]
          } !w-full`}
          type="password"
          placeholder="비밀번호를 다시 한 번 입력하세요"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError({ ...error, confirmPassword: false });
          }}
        />
        {error.confirmPassword && (
          <div className="ml-3 text-red-400 text-xs text-nowrap font-light">
            {error.confirmPassword}
          </div>
        )}
      </div>
      <div className="flex flex-col"></div>
    </div>
  );
};

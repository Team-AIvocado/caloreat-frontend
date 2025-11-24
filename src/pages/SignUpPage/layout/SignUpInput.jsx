export const SignUpInput = ({
  error,
  sty,
  userEmail,
  setUserEmail,
  setError,
  setdbCheck,
  dbCheck,
  onEmailCheck,
  sty2,
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
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div>
            <input
              className={error.email ? sty[1] : sty[0]}
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
            className={dbCheck.email ? sty2[1] : sty2[0]}
            onClick={onEmailCheck}
          >
            중복확인
          </button>
        </div>
        <div className="flex flex-row">
          <div>
            <input
              className={error.id ? sty[1] : sty[0]}
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
            className={dbCheck.id ? sty2[1] : sty2[0]}
            onClick={onIdCheck}
          >
            중복확인
          </button>
        </div>
        <input
          className={error.name ? sty[1] : sty[0]}
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
          className={error.password ? sty[1] : sty[0]}
          type="password"
          placeholder="비밀번호를 입력하세요 (영문 숫자 섞어서 5자 이상)"
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
          className={error.confirmPassword ? sty[1] : sty[0]}
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

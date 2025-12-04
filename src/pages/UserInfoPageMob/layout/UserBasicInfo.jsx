import { sty } from "../../../utils/styles";

export const UserBasicInfo = ({
  setStep,
  userProfile,
  setUserProfile,
  setError,
  error,
}) => {
  const inputCheck = () => {
    if (userProfile.gender == "") {
      setError({ ...error, gender: "성별을 선택해주세요" });
      return;
    } else {
      setError({ ...error, gender: "" });
    }
    setStep(2);
  };
  return (
    <>
      <div>
        <button onClick={() => setStep(1)}>이전</button>
        <div className="pl-7">
          <button
            className={userProfile.gender == 1 ? sty[1] : sty[0]}
            onClick={() => {
              setUserProfile({ ...userProfile, gender: 1 });
              setError({ ...error, gender: "" });
            }}
          >
            남성
          </button>
          <button
            className={userProfile.gender == 2 ? sty[1] : sty[0]}
            onClick={() => {
              setUserProfile({ ...userProfile, gender: 2 });
              setError({ ...error, gender: "" });
            }}
          >
            여성
          </button>
        </div>
        {error.gender && (
          <div className="text-red-400 text-xs mb-1">{error.gender}</div>
        )}
        <button onClick={inputCheck}>다음</button>
      </div>
    </>
  );
};

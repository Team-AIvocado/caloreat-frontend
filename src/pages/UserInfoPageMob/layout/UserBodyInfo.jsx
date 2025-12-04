export const UserBodyInfo = ({
  setStep,
  userProfile,
  setUserProfile,
  setError,
  error,
}) => {
  const numberRegex = /^\d+(\.\d+)?$/;

  const inputCheck = () => {
    if (!userProfile.age) {
      setError({ ...error, age: "나이를 입력해주세요" });
      return;
    } else if (!numberRegex.test(userProfile.age.trim())) {
      setError({ ...error, age: "숫자만 입력가능합니다." });
      return;
    } else {
      setError({ ...error, age: "" });
    }

    if (!userProfile.height) {
      setError({ ...error, height: "키를 입력해주세요" });
      return;
    } else if (!numberRegex.test(userProfile.height.trim())) {
      setError({ ...error, height: "숫자만 입력가능합니다." });
      return;
    } else {
      setError({ ...error, height: "" });
    }

    if (!userProfile.weight) {
      setError({ ...error, weight: "몸무게를 입력해주세요" });
      return;
    } else if (!numberRegex.test(userProfile.weight.trim())) {
      setError({ ...error, weight: "숫자만 입력가능합니다." });
      return;
    } else {
      setError({ ...error, weight: "" });
    }

    setStep(3);
  };
  return (
    <>
      <div>
        <button onClick={() => setStep(1)}>이전</button>
        <label className="text-xs text-secondary_text pl-6">
          나이{" "}
          <input
            className="rounded-lg border w-36 pl-3 py-2 ml-1 mr-4 mb-1.5 text-sm bg-white focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color"
            placeholder="나이를 입력하세요"
            value={userProfile.age}
            onChange={(e) => {
              setUserProfile({ ...userProfile, age: e.target.value });
              setError({ ...error, age: "" });
            }}
            type="text"
          />
          {error.age && (
            <div className="text-red-400 text-xs mb-1 pl-10">{error.age}</div>
          )}
        </label>

        <label className="text-xs text-secondary_text pl-6 ">
          키{" "}
          <input
            className="rounded-lg border w-36 pl-3 py-2 ml-2.5 mr-4 mb-1.5 text-sm bg-white focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color"
            placeholder="키(cm)를 입력하세요"
            value={userProfile.height}
            onChange={(e) => {
              setUserProfile({ ...userProfile, height: e.target.value });
              setError({ ...error, height: "" });
            }}
            type="text"
          />
          {error.height && (
            <div className="text-red-400 text-xs mb-1 pl-10">
              {error.height}
            </div>
          )}
        </label>

        <label className="text-xs text-secondary_text ">
          몸무게{" "}
          <input
            className="rounded-lg border w-40 ml-2.5 pl-3 py-2 mb-1.5 text-sm bg-white focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color"
            placeholder="몸무게(kg)를 입력하세요"
            value={userProfile.weight}
            onChange={(e) => {
              setUserProfile({ ...userProfile, weight: e.target.value });
              setError({ ...error, weight: "" });
            }}
            type="text"
          />
          {error.weight && (
            <div className="text-red-400 text-xs mp-1 pl-14">
              {error.weight}
            </div>
          )}
        </label>
        <button onClick={inputCheck}>다음</button>
      </div>
    </>
  );
};

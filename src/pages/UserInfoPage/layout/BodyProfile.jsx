export const BodyProfile = ({
  userProfile,
  sty,
  setUserProfile,
  setError,
  error,
}) => {
  return (
    <>
      <div className="text-sm text-secondary_text mb-1.5 font-semibold">
        신체 정보
      </div>

      <div className="pl-7">
        <button
          className={userProfile.gender == 0 ? sty[1] : sty[0]}
          onClick={() => {
            setUserProfile({ ...userProfile, gender: 0 });
            setError({ ...error, gender: "" });
          }}
        >
          남성
        </button>
        <button
          className={userProfile.gender == 1 ? sty[1] : sty[0]}
          onClick={() => {
            setUserProfile({ ...userProfile, gender: 1 });
            setError({ ...error, gender: "" });
          }}
        >
          여성
        </button>
      </div>
      {error.gender && (
        <div className="text-red-400 text-xs mb-1">{error.gender}</div>
      )}
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
          <div className="text-red-400 text-xs mb-1 pl-10">{error.height}</div>
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
          <div className="text-red-400 text-xs mp-1 pl-14">{error.weight}</div>
        )}
      </label>
    </>
  );
};

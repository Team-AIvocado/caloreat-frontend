import { sty } from "../../../utils/styles";

export const BodyProfile = ({
  userProfile,
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
          className={userProfile.gender == "male" ? sty[1] : sty[0]}
          onClick={() => {
            setUserProfile({ ...userProfile, gender: "male" });
            setError({ ...error, gender: "" });
          }}
        >
          남성
        </button>
        <button
          className={userProfile.gender == "female" ? sty[1] : sty[0]}
          onClick={() => {
            setUserProfile({ ...userProfile, gender: "female" });
            setError({ ...error, gender: "" });
          }}
        >
          여성
        </button>
      </div>
      {error.gender && (
        <div className="text-red-400 text-xs mb-1">{error.gender}</div>
      )}
      <label className="text-xs text-secondary_text ">
        생년월일{" "}
        <input
          type="date"
          className="rounded-lg border w-36 pl-3 py-2 ml-1 mr-4 mb-1.5 text-sm bg-white focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color"
          value={userProfile.birthdate}
          onChange={(e) => {
            setUserProfile({ ...userProfile, birthdate: e.target.value });
            setError({ ...error, birthdate: "" });
          }}
        />
        {error.birthdate && (
          <div className="text-red-400 text-xs mb-1 pl-10">
            {error.birthdate}
          </div>
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

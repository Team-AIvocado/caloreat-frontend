import { sty } from "../../../utils/styles";

export const Gender = ({
  userProfile,
  setUserProfile,
  setError,
  error,
  onNext,
  onPrev,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-lg text-secondary_text mb-3 font-semibold w-full text-center">
        성별 입력
      </div>
      <div className="flex flex-row justify-center w-full mb-4">
        <button
          className={`${userProfile.gender === "male"
            ? "bg-main_color text-white"
            : "bg-white dark:bg-gray-800 text-secondary_text dark:text-white"
            } text-lg px-10 py-7 rounded-lg mr-2 border border-border_color !px-10 !py-7 !mr-2 !mb-0`}
          onClick={() => {
            setUserProfile({ ...userProfile, gender: "male" });
            setError({ ...error, gender: "" });
          }}
        >
          남성
        </button>
        <button
          className={`${userProfile.gender === "female"
            ? "bg-main_color text-white"
            : "bg-white dark:bg-gray-800 text-secondary_text dark:text-white"
            } text-lg px-10 py-7 rounded-lg border border-border_color !px-10 !py-7 !mr-0 !mb-0`}
          onClick={() => {
            setUserProfile({ ...userProfile, gender: "female" });
            setError({ ...error, gender: "" });
          }}
        >
          여성
        </button>
      </div>
      {error.gender && (
        <div className="text-red-400 text-xs mb-2 w-full text-center">
          {error.gender}
        </div>
      )}

      <div className="flex flex-row justify-between w-full mt-6">
        <button
          className="bg-white dark:bg-gray-800 border border-border_color text-secondary_text dark:text-white rounded-lg px-8 py-2 text-sm cursor-pointer w-[48%]"
          onClick={onPrev}
        >
          이전
        </button>
        <button
          className="bg-main_color text-white rounded-lg px-8 py-2 text-sm cursor-pointer w-[48%]"
          onClick={onNext}
        >
          다음
        </button>
      </div>
    </div>
  );
};

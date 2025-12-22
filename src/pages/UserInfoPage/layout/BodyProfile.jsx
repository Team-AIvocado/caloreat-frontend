export const BodyProfile = ({
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
        신체 정보 입력
      </div>

      <div className="flex flex-col items-center w-full space-y-4">
        <div className="flex flex-col w-2/3">
          <label className="text-xs text-secondary_text mb-1 ml-1">키</label>
          <input
            className="rounded-lg border w-full pl-3 py-3 text-sm bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color"
            placeholder="키(cm)를 입력하세요"
            value={userProfile.height}
            onChange={(e) => {
              setUserProfile({ ...userProfile, height: e.target.value });
              setError({ ...error, height: "" });
            }}
            type="text"
          />
          {error.height && (
            <div className="text-red-400 text-xs mt-1 ml-1 text-center">
              {error.height}
            </div>
          )}
        </div>

        <div className="flex flex-col w-2/3">
          <label className="text-xs text-secondary_text mb-1 ml-1">
            몸무게
          </label>
          <input
            className="rounded-lg border w-full pl-3 py-3 text-sm bg-white dark:bg-gray-700 dark:text-gray-100 focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color"
            placeholder="몸무게(kg)를 입력하세요"
            value={userProfile.weight}
            onChange={(e) => {
              setUserProfile({ ...userProfile, weight: e.target.value });
              setError({ ...error, weight: "" });
            }}
            type="text"
          />
          {error.weight && (
            <div className="text-red-400 text-xs mt-1 ml-1 text-center">
              {error.weight}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row justify-between w-full mt-6">
        <button
          className="bg-white dark:bg-sub_background border border-border_color text-secondary_text rounded-lg px-8 py-2 text-sm cursor-pointer w-[48%]"
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

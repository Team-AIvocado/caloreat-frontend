import { backBtn } from "../../../utils/styles";

export const ModifyInput = ({
  userInput,
  setUserInput,
  setFoodText,
  closeAlert,
}) => {
  return (
    <div className=" w-full flex flex-col items-center">
      <input
        className="focus:outline-none focus:ring-0 w-5/6 bg-white rounded-lg mb-2 px-2 py-1 border border-border_color"
        type="text"
        placeholder="음식명을 직접 입력해주세요"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className="flex flex-row">
        <button
          className={`${backBtn} flex justofy-center mr-3`}
          onClick={() => {
            setFoodText(userInput);
            closeAlert();
          }}
        >
          수정완료
        </button>
        <button
          className={`${backBtn} flex justofy-center`}
          onClick={closeAlert}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

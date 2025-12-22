import { sty1 } from "../../../utils/styles";

export const GoalSelector = ({ modeSelect, setModeSelect, handleToggle }) => {
  return (
    <div className="flex flex-col items-center w-full gap-3">
      <button
        className={`${modeSelect == "loss"
            ? "bg-main_color text-white"
            : "bg-white dark:bg-sub_background text-secondary_text"
          } border border-border_color rounded-lg py-3 w-2/3`}
        onClick={() => {
          setModeSelect(handleToggle(modeSelect, "loss"));
        }}
      >
        체중 감량
      </button>
      <button
        className={`${modeSelect == "maintain"
            ? "bg-main_color text-white"
            : "bg-white dark:bg-sub_background text-secondary_text"
          } border border-border_color rounded-lg py-3 w-2/3`}
        onClick={() => {
          setModeSelect(handleToggle(modeSelect, "maintain"));
        }}
      >
        유지
      </button>
      <button
        className={`${modeSelect == "gain"
            ? "bg-main_color text-white"
            : "bg-white dark:bg-sub_background text-secondary_text"
          } border border-border_color rounded-lg py-3 w-2/3`}
        onClick={() => {
          setModeSelect(handleToggle(modeSelect, "gain"));
        }}
      >
        체중 증량
      </button>
    </div>
  );
};

import { sty1 } from "../../../utils/styles";

export const GoalSelector = ({ modeSelect, setModeSelect, handleToggle }) => {
  return (
    <label className="text-xs text-secondary_text pl-3">
      현재 목표{" "}
      <div className="mt-2 mb-2 pl-5">
        <button
          className={modeSelect == 0 ? sty1[1] : sty1[0]}
          onClick={() => {
            setModeSelect(handleToggle(modeSelect, 0));
          }}
        >
          체중 감량
        </button>
        <button
          className={modeSelect == 1 ? sty1[1] : sty1[0]}
          onClick={() => {
            setModeSelect(handleToggle(modeSelect, 1));
          }}
        >
          유지
        </button>
        <button
          className={modeSelect == 2 ? sty1[1] : sty1[0]}
          onClick={() => {
            setModeSelect(handleToggle(modeSelect, 2));
          }}
        >
          체중 증량
        </button>
      </div>
    </label>
  );
};

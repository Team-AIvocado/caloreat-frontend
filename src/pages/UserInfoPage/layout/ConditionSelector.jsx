import { sty1 } from "../../../utils/styles";

export const ConditionSelector = ({
  condition,
  updateCondition,
  handleToggle,
}) => {
  return (
    <div className="flex flex-col items-center w-full gap-3">
      <button
        className={`${condition.diabetes == true
            ? "bg-main_color text-white"
            : "bg-white dark:bg-sub_background text-secondary_text"
          } border border-border_color rounded-lg py-3 w-2/3`}
        onClick={() =>
          updateCondition("diabetes", handleToggle(condition.diabetes, true))
        }
      >
        당뇨
      </button>
      <button
        className={`${condition.high_blood_pressure == true
            ? "bg-main_color text-white"
            : "bg-white dark:bg-sub_background text-secondary_text"
          } border border-border_color rounded-lg py-3 w-2/3`}
        onClick={() =>
          updateCondition(
            "high_blood_pressure",
            handleToggle(condition.high_blood_pressure, true)
          )
        }
      >
        고혈압
      </button>
      <button
        className={`${condition.low_blood_pressure == true
            ? "bg-main_color text-white"
            : "bg-white dark:bg-sub_background text-secondary_text"
          } border border-border_color rounded-lg py-3 w-2/3`}
        onClick={() =>
          updateCondition(
            "low_blood_pressure",
            handleToggle(condition.low_blood_pressure, true)
          )
        }
      >
        저혈압
      </button>
      <button
        className={`${condition.hyperlipidemia == true
            ? "bg-main_color text-white"
            : "bg-white dark:bg-sub_background text-secondary_text"
          } border border-border_color rounded-lg py-3 w-2/3`}
        onClick={() =>
          updateCondition(
            "hyperlipidemia",
            handleToggle(condition.hyperlipidemia, true)
          )
        }
      >
        고지혈증
      </button>
    </div>
  );
};

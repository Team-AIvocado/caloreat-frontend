import { sty1 } from "../../../utils/styles";

export const ConditionSelector = ({
  condition,
  updateCondition,
  handleToggle,
}) => {
  return (
    <label className="text-xs text-secondary_text pl-3">
      건강 고려 사항{" "}
      <div className="mt-3">
        <button
          className={condition.diabetes == true ? sty1[1] : sty1[0]}
          onClick={() =>
            updateCondition("diabetes", handleToggle(condition.diabetes, true))
          }
        >
          당뇨
        </button>
        <button
          className={condition.high_blood_pressure == true ? sty1[1] : sty1[0]}
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
          className={condition.low_blood_pressure == true ? sty1[1] : sty1[0]}
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
          className={condition.hyperlipidemia == true ? sty1[1] : sty1[0]}
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
    </label>
  );
};

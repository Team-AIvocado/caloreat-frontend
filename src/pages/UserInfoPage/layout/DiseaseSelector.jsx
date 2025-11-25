import { sty1 } from "../../../utils/styles";

export const DiseaseSelector = ({ condition, updateDisease, handleToggle }) => {
  return (
    <label className="text-xs text-secondary_text pl-3">
      건강 고려 사항{" "}
      <div className="mt-3">
        <button
          className={condition.disease.diabetes == true ? sty1[1] : sty1[0]}
          onClick={() =>
            updateDisease(
              "diabetes",
              handleToggle(condition.disease.diabetes, true)
            )
          }
        >
          당뇨
        </button>
        <button
          className={
            condition.disease.high_blood_pressure == true ? sty1[1] : sty1[0]
          }
          onClick={() =>
            updateDisease(
              "high_blood_pressure",
              handleToggle(condition.disease.high_blood_pressure, true)
            )
          }
        >
          고혈압
        </button>
        <button
          className={
            condition.disease.low_blood_pressure == true ? sty1[1] : sty1[0]
          }
          onClick={() =>
            updateDisease(
              "low_blood_pressure",
              handleToggle(condition.disease.low_blood_pressure, true)
            )
          }
        >
          저혈압
        </button>
        <button
          className={
            condition.disease.hyperlipidemia == true ? sty1[1] : sty1[0]
          }
          onClick={() =>
            updateDisease(
              "hyperlipidemia",
              handleToggle(condition.disease.hyperlipidemia, true)
            )
          }
        >
          고지혈증
        </button>
      </div>
    </label>
  );
};

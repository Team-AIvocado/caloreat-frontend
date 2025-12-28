import React from "react";

export const ConditionAlert = ({
  totalCalories,
  goalCalories,
  goals,
  nutritions,
  calculateStatus,
}) => {
  if (!nutritions || !goalCalories) return null;

  const alerts = [];

  // Calorie Alert
  if (totalCalories) {
    const ratio = totalCalories / goalCalories;
    if (ratio > 1.1) {
      alerts.push({
        type: "over",
        message: "칼로리 섭취량이 적정량을 초과했어요!",
        detail: `권장: ${goalCalories}kcal / 섭취: ${totalCalories}kcal`,
      });
    } else if (ratio >= 0.9 && ratio <= 1.1) {
      alerts.push({
        type: "good",
        message: "칼로리 섭취량이 적정해요!",
        detail: `권장: ${goalCalories}kcal / 섭취: ${totalCalories}kcal`,
      });
    }
  }

  const nutrientConfig = {
    sugar: { label: "당류", unit: "g", isLimit: true },
    fiber: { label: "식이섬유", unit: "g", isLimit: false },
    sodium: { label: "나트륨", unit: "mg", isLimit: true },
    cholesterol: { label: "콜레스테롤", unit: "mg", isLimit: true },
    saturated_fat: { label: "포화지방", unit: "g", isLimit: true },
  };

  Object.keys(nutrientConfig).forEach((key) => {
    const value = nutritions[key];
    const goal = goals[key];
    const config = nutrientConfig[key];

    if (value !== undefined && goal) {
      const status = calculateStatus(value, goal, config.isLimit);
      const goalDisplay = Math.round(goal);

      if (status === "과다") {
        alerts.push({
          type: "over",
          message: `${config.label} 섭취량이 적정량을 초과했어요!`,
          detail: `권장: ${goalDisplay}${config.unit} 미만 / 섭취: ${value}${config.unit}`,
        });
      } else if (status === "부족" && !config.isLimit) {
        // fiber만 부족 경고 (isLimit: false인 것만)
        alerts.push({
          type: "lack",
          message: `${config.label} 섭취량이 부족해요!`,
          detail: `권장: ${goalDisplay}${config.unit} 이상 / 섭취: ${value}${config.unit}`,
        });
      }
    }
  });

  if (alerts.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-3 mt-4">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`w-full p-4 rounded-lg border flex items-center gap-3 ${
            alert.type === "over"
              ? "bg-lack_bg border-2 border-lack_border"
              : alert.type === "lack"
              ? "bg-light-alert border-2 border-light-alert-border"
              : "bg-enough border-2 border-enough-border"
          }`}
        >
          <div className="text-xs text-primary_text pl-3 pb-10 mr-5">
            {alert.type === "good"
              ? "양호 "
              : alert.type === "over"
              ? "과다 "
              : "부족 "}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-secondary_text">
              {alert.message}
            </span>
            <span className="text-xs text-secondary_text">{alert.detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

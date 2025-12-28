export const Summary = ({ stats, goalCalories }) => {
  // 데이터가 없거나 총 칼로리가 0인 경우(섭취 기록 없음) 표시하지 않음
  if (!stats || !stats.nutrients || stats.totalCalories === 0) return null;

  const { carbs, protein, fat } = stats.nutrients;

  // Calculate Goals (Based on standard ratios: C 50%, P 30%, F 20%)
  const goals = {
    //1g 당 4/9 kcal 칼로리밀도 반영
    carbs: Math.round((goalCalories * 0.5) / 4),
    protein: Math.round((goalCalories * 0.3) / 4),
    fat: Math.round((goalCalories * 0.2) / 9),
  };

  const getStatus = (value, goal) => {
    const ratio = value / goal;
    if (ratio >= 0.8 && ratio <= 1.2)
      return {
        label: "양호",
        color: "text-sufficient",
        border: "border-2 border-sufficient",
      };
    if (ratio >= 0.6 && ratio < 0.8)
      return {
        label: "유의",
        color: "text-alert_color",
        border: "border-2 border-alert_color",
      };
    if (ratio > 1.2 && ratio <= 1.4)
      return {
        label: "유의",
        color: "text-alert_color",
        border: "border-2 border-alert_color",
      };
    return {
      label: "주의",
      color: "text-over",
      border: "border-2 border-over",
    };
  };

  const items = [
    { name: "탄수화물", value: carbs.amount, goal: goals.carbs },
    { name: "단백질", value: protein.amount, goal: goals.protein },
    { name: "지방", value: fat.amount, goal: goals.fat },
  ];

  return (
    <div className="w-full mt-4 grid grid-cols-3 gap-3">
      {items.map((item) => {
        const status = getStatus(item.value, item.goal);
        return (
          <div
            key={item.name}
            className={`bg-white rounded-lg p-4 flex flex-col items-center justify-center ${status.border}`}
          >
            <div className="text-secondary_text text-sm mb-2">{item.name}</div>
            <div className={`text-xl font-bold mb-2 ${status.color}`}>
              {status.label}
            </div>
            <div className="text-xs text-third_text">평균 {item.value}g</div>
            <div className="text-xs text-third_text">목표 {item.goal}g</div>
          </div>
        );
      })}
    </div>
  );
};

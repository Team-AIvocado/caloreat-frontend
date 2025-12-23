export const DailyLog = ({ logs }) => {
  const mealTypeMap = {
    breakfast: "아침",
    lunch: "점심",
    dinner: "저녁",
    snack: "간식",
  };

  if (!logs || logs.length === 0) {
    return (
      <div className="bg-white rounded-xl p-5 border border-sub_border w-full mt-4 text-center text-secondary_text">
        기록된 식단이 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-5 border-3 border-sub_border w-full mt-4">
      <div className="flex text-primary_text text-xl pl-5 pt-4 mb-7">
        오늘의 식단
      </div>
      <div className="flex flex-col gap-3">
        {logs.map((log, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm border-b px-3 border-sub_border pb-2 last:border-0 "
          >
            <div className="flex items-center gap-3">
              <span className="text-secondary_text font-medium w-10">
                {mealTypeMap[log.mealType] || log.mealType}
              </span>
              <span className="text-primary_text font-bold">{log.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-main_color font-bold">
                {log.calories} kcal
              </span>
              <span className="text-secondary_text text-xs">
                {log.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import RingProgressBar from "../../components/ProgressBar/RingProgressBar";
import { useEffect } from "react";
import { useMeals } from "../../context/MealContext";
import { useAuth } from "../../context/AuthContext";

export const DashBoardPage = () => {
  const navigate = useNavigate();
  const { calculateBMR } = useAuth();
  const { logs, fetchLogs } = useMeals();

  const goalCalories = calculateBMR();

  useEffect(() => {
    fetchLogs(new Date());
  }, []); // Fetch today's logs on mount

  // Calculate total calories (백엔드 구조에 맞게 수정)
  const totalKcal = (logs || []).reduce((total, meal) => {
    return (
      total +
      (meal.meal_items || []).reduce(
        (mealTotal, item) =>
          mealTotal + (item.nutritions?.calories * item?.quantity || 0),
        0
      )
    );
  }, 0);

  const onFoodReg = () => {
    navigate("/main/foodreg");
  };

  const mealTypeLabels = {
    breakfast: "아침",
    lunch: "점심",
    dinner: "저녁",
    snack: "간식",
  };

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <div className="pt-28 pb-11 text-center text-2xl text-secondary_text">
        오늘의 누적 칼로리
      </div>
      <RingProgressBar totalkcal={goalCalories} kcal={Math.round(totalKcal)} />

      {logs && logs.length > 0 ? (
        <div className="border w-full max-w-[400px] border-sub_color px-8 py-6 mt-6 rounded-lg bg-white/60 flex flex-col gap-4">
          {logs
            .filter((meal) => {
              const mealKcal = (meal.meal_items || []).reduce(
                (acc, item) =>
                  acc + (item.nutritions?.calories * item?.quantity || 0),
                0
              );
              return Math.round(mealKcal) > 0;
            })
            .map((meal) => {
              const mealKcal = (meal.meal_items || []).reduce(
                (acc, item) =>
                  acc + (item.nutritions?.calories * item?.quantity || 0),
                0
              );
              return (
                <div
                  key={meal.id}
                  className="text-secondary_text w-full flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-lg text-primary_text font-bold min-w-[40px]">
                      {mealTypeLabels[meal.meal_type] || meal.meal_type}
                    </div>
                    <div className="text-sm">
                      {(meal.meal_items || [])
                        .map((item) => item.foodname)
                        .join(", ")}
                    </div>
                  </div>
                  <div className="text-primary_text font-light whitespace-nowrap">
                    {Math.round(mealKcal)} kcal
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="mt-8 text-secondary_text">오늘의 기록이 없습니다.</div>
      )}

      <button
        className="bg-main_color text-white rounded-lg px-8 py-2 mt-5 text-sm cursor-pointer"
        onClick={onFoodReg}
      >
        기록하기
      </button>
    </div>
  );
};

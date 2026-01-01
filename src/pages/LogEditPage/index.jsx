import { useMeals } from "../../context/MealContext";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { liquidKeywords } from "../../utils/food";

export const LogEditPage = () => {
  const { logs, updateFood } = useMeals();
  const { mealId, foodIndex } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dateFromUrl = searchParams.get("date");

  // 백엔드 구조에 맞게 변경
  const meal = logs.find((m) => m.id === Number(mealId));
  const item = meal?.meal_items[Number(foodIndex)];

  if (!item || !meal) {
    return (
      <div className="p-5 text-center">
        <p>해당 음식 정보를 찾을 수 없습니다.</p>
        <button onClick={() => navigate(-1)}>← back</button>
      </div>
    );
  }

  // eaten_at에서 시간 추출
  const getTimeFromEatenAt = (eatenAt) => {
    if (!eatenAt) return "12:00";
    const d = new Date(eatenAt);
    return `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  };

  const getBaseWeight = (food) => {
    const {
      carbs = 0,
      protein = 0,
      fat = 0,
      sugar = 0,
      sodium = 0,
    } = food?.nutritions || {};
    const total = carbs + protein + fat + sugar + sodium / 1000;
    return Math.max(Math.round(total), 100);
  };

  const isLiquid = (name) => {
    return liquidKeywords.some((keyword) => name?.includes(keyword));
  };

  const baseWeight = getBaseWeight(item);
  const liquid = isLiquid(item.foodname);

  const [form, setForm] = useState({
    foodname: item.foodname,
    calories: Math.round(
      (item.nutritions?.calories || 0) * (item.quantity || 1)
    ),
    // 액체면 ml, 아니면 인분(servings)으로 초기화
    quantity: liquid
      ? Math.round((item.quantity || 1) * baseWeight)
      : item.quantity || 1,
    eatenTime: getTimeFromEatenAt(meal.eaten_at),
  });

  const unit = liquid ? "ml" : "인분";

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 기존 eaten_at의 날짜와 새로운 시간 조합
      const originalDate = new Date(meal.eaten_at);
      const [hours, minutes] = form.eatenTime.split(":").map(Number);
      originalDate.setHours(hours, minutes, 0, 0);
      // 로컬 시간을 타임존 포함 ISO 형식으로 변환
      const pad = (n) => String(n).padStart(2, "0");
      const offset = -originalDate.getTimezoneOffset();
      const offsetSign = offset >= 0 ? "+" : "-";
      const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
      const offsetMins = pad(Math.abs(offset) % 60);
      const newEatenAt = `${originalDate.getFullYear()}-${pad(originalDate.getMonth() + 1)}-${pad(originalDate.getDate())}T${pad(originalDate.getHours())}:${pad(originalDate.getMinutes())}:${pad(originalDate.getSeconds())}${offsetSign}${offsetHours}:${offsetMins}`;

      // nutritions 객체 구조 유지하면서 calories만 업데이트
      // quantity는 다시 servings 단위로 변환 (액체인 경우만 weight / baseWeight)
      await updateFood(
        Number(mealId),
        Number(foodIndex),
        {
          foodname: form.foodname,
          quantity: liquid ? form.quantity / baseWeight : form.quantity,
          nutritions: {
            ...item?.nutritions,
            calories: item?.nutritions?.calories,
          },
        },
        { eaten_at: newEatenAt }
      );
      navigate(`/main/log/${mealId}/${foodIndex}?date=${dateFromUrl}`);
    } catch (err) {
      console.error(err);
      alert("수정에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!item) {
    return (
      <div className="p-5 text-center">
        <p>해당 음식 정보를 찾을 수 없습니다.</p>
        <button onClick={() => navigate(-1)}>← back</button>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto p-4 sm:p-6 bg-main_background">
      <button
        onClick={() => navigate(-1)}
        className="mr-4 text-gray-600 hover:text-gray-900 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <h2 className="text-2xl font-semibold text-primary_text mb-4">
        음식 정보 수정
      </h2>

      <div className="flex flex-col gap-4 bg-sub_background p-5 rounded-[14px] border border-border_color">
        <label className="flex flex-col gap-1.5">
          <span className="text-secondary_text text-sm">음식명</span>
          <input
            value={form.foodname}
            onChange={(e) => setForm({ ...form, foodname: e.target.value })}
            className="p-3 rounded-lg border border-border_color text-base bg-white"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-secondary_text text-sm">칼로리 (kcal)</span>
          <input
            type="number"
            value={form.calories}
            onChange={(e) =>
              setForm({ ...form, calories: Number(e.target.value) })
            }
            readOnly
            className="p-3 rounded-lg border border-border_color text-base bg-white"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="text-secondary_text text-sm">섭취량 ({unit})</span>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                const step = liquid ? 50 : 0.5;
                if (form.quantity <= step) return;
                setForm((prev) => {
                  const newQuantity = prev.quantity - step;
                  const baseCalories = item?.nutritions?.calories || 0;
                  return {
                    ...prev,
                    quantity: newQuantity,
                    calories: Math.round(
                      liquid
                        ? baseCalories * (newQuantity / baseWeight)
                        : baseCalories * newQuantity
                    ),
                  };
                });
              }}
              className="w-10 h-10 shrink-0 rounded-lg bg-main_color text-white text-xl font-bold cursor-pointer border-none"
            >
              -
            </button>
            <input
              type="number"
              value={form.quantity}
              step={liquid ? "50" : "0.5"}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val <= 0) return;
                setForm((prev) => {
                  const baseCalories = item?.nutritions?.calories || 0;
                  return {
                    ...prev,
                    quantity: val,
                    calories: Math.round(
                      liquid
                        ? baseCalories * (val / baseWeight)
                        : baseCalories * val
                    ),
                  };
                });
              }}
              className="flex-1 min-w-0 p-3 rounded-lg border border-border_color text-base text-center bg-white"
            />
            <button
              type="button"
              onClick={() => {
                const step = liquid ? 50 : 0.5;
                setForm((prev) => {
                  const newQuantity = prev.quantity + step;
                  const baseCalories = item?.nutritions?.calories || 0;
                  return {
                    ...prev,
                    quantity: newQuantity,
                    calories: Math.round(
                      liquid
                        ? baseCalories * (newQuantity / baseWeight)
                        : baseCalories * newQuantity
                    ),
                  };
                });
              }}
              className="w-10 h-10 shrink-0 rounded-lg bg-main_color text-white text-xl font-bold cursor-pointer border-none"
            >
              +
            </button>
          </div>
          <p className="text-xs text-secondary_text text-center mt-2">
            1인분 = {baseWeight}
            {liquid ? "ml" : "g"} 기준
            {!liquid && ` (현재 ${Math.round(form.quantity * baseWeight)}g)`}
          </p>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-secondary_text text-sm">섭취 시간</span>
          <input
            type="time"
            value={form.eatenTime}
            onChange={(e) => setForm({ ...form, eatenTime: e.target.value })}
            className="p-3 rounded-lg border border-border_color text-base bg-white"
          />
        </label>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`w-full mt-6 py-3.5 rounded-[10px] bg-main_color border-none text-white text-base font-semibold ${
          isSaving ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
      >
        {isSaving ? "저장 중..." : "저장하기"}
      </button>
    </div>
  );
};

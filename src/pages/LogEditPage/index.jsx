import { useMeals } from "../../context/MealContext";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export const LogEditPage = () => {
  const { logs, updateFood } = useMeals();
  const { mealId, foodIndex } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dateFromUrl = searchParams.get("date");

  // 백엔드 구조에 맞게 변경
  const meal = logs.find((m) => m.id === Number(mealId));
  const item = meal?.meal_items[Number(foodIndex)];

  // eaten_at에서 시간 추출
  const getTimeFromEatenAt = (eatenAt) => {
    if (!eatenAt) return "12:00";
    const d = new Date(eatenAt);
    return `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  };

  const [form, setForm] = useState({
    foodname: item?.foodname || "",
    calories: item?.nutritions?.calories || 0,
    quantity: item?.quantity || 1,
    eatenTime: getTimeFromEatenAt(meal?.eaten_at),
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 기존 eaten_at의 날짜와 새로운 시간 조합
      const originalDate = new Date(meal.eaten_at);
      const [hours, minutes] = form.eatenTime.split(":").map(Number);
      originalDate.setHours(hours, minutes, 0, 0);
      const newEatenAt = originalDate.toISOString();

      // nutritions 객체 구조 유지하면서 calories만 업데이트
      await updateFood(
        Number(mealId),
        Number(foodIndex),
        {
          foodname: form.foodname,
          quantity: form.quantity,
          nutritions: {
            ...item?.nutritions,
            calories: form.calories,
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
    <div className="max-w-[600px] mx-auto p-6 bg-main_background min-h-screen">
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

      <h2 className="text-2xl font-semibold text-primary_text mb-6">
        음식 정보 수정
      </h2>

      <div className="flex flex-col gap-4 bg-sub_background p-5 rounded-[14px] border border-border_color">
        <label className="flex flex-col gap-1.5">
          <span className="text-secondary_text text-sm">음식명</span>
          <input
            value={form.foodname}
            onChange={(e) => setForm({ ...form, foodname: e.target.value })}
            className="p-3 rounded-lg border border-border_color text-base"
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
            className="p-3 rounded-lg border border-border_color text-base"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="text-secondary_text text-sm">섭취량 (인분)</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (form.quantity <= 0.5) return;
                setForm((prev) => ({
                  ...prev,
                  calories: Number(
                    Math.round(
                      (prev.calories * (prev.quantity - 0.5)) / prev.quantity
                    )
                  ),
                  quantity: prev.quantity - 0.5,
                }));
              }}
              className="w-10 h-10 rounded-lg bg-main_color text-white text-xl font-bold cursor-pointer border-none"
            >
              -
            </button>
            <input
              type="number"
              value={form.quantity}
              step="0.5"
              onChange={(e) => {
                if (e.target.value <= 0) return;
                setForm((prev) => ({
                  ...prev,
                  calories: Number(
                    Math.round((prev.calories * e.target.value) / prev.quantity)
                  ),
                  quantity: Number(e.target.value),
                }));
              }}
              className="flex-1 p-3 rounded-lg border border-border_color text-base text-center"
            />
            <button
              type="button"
              onClick={() => {
                setForm((prev) => ({
                  ...prev,
                  calories: Number(
                    Math.round(
                      (prev.calories * (prev.quantity + 0.5)) / prev.quantity
                    )
                  ),
                  quantity: prev.quantity + 0.5,
                }));
              }}
              className="w-10 h-10 rounded-lg bg-main_color text-white text-xl font-bold cursor-pointer border-none"
            >
              +
            </button>
          </div>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-secondary_text text-sm">섭취 시간</span>
          <input
            type="time"
            value={form.eatenTime}
            onChange={(e) => setForm({ ...form, eatenTime: e.target.value })}
            className="p-3 rounded-lg border border-border_color text-base"
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

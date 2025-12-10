import { useMeals } from "../../context/MealContext";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export const LogEditPage = () => {
  const { logs, updateFood } = useMeals();
  const { mealId, foodIndex } = useParams();
  const navigate = useNavigate();

  const meal = logs.find((m) => m.meal_id === Number(mealId));
  const food = meal?.foods[Number(foodIndex)];

  const [form, setForm] = useState({
    name: food?.name || "",
    kcal: food?.kcal || 0,
    amount: food?.amount || 1,
  });

  const handleSave = () => {
    updateFood(Number(mealId), Number(foodIndex), form);
    navigate(`/main/log/${mealId}/${foodIndex}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>음식 정보 수정</h2>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="number"
        value={form.kcal}
        onChange={(e) => setForm({ ...form, kcal: Number(e.target.value) })}
      />
      <input
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
      />
      <button onClick={handleSave}>저장하기</button>
    </div>
  );
};

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

  const [form, setForm] = useState({
    foodname: item?.foodname || "",
    calories: item?.nutritions?.calories || 0,
    quantity: item?.quantity || 1,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // nutritions 객체 구조 유지하면서 calories만 업데이트
      await updateFood(Number(mealId), Number(foodIndex), {
        foodname: form.foodname,
        quantity: form.quantity,
        nutritions: {
          ...item?.nutritions,
          calories: form.calories,
        },
      });
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
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>해당 음식 정보를 찾을 수 없습니다.</p>
        <button onClick={() => navigate(-1)}>← back</button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "24px",
        background: "var(--color-main_background)",
        minHeight: "100vh",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          border: "none",
          background: "none",
          fontSize: "16px",
          color: "var(--color-primary_text)",
          cursor: "pointer",
          marginBottom: "16px",
        }}
      >
        ← back
      </button>

      <h2
        style={{
          fontSize: "24px",
          fontWeight: 600,
          color: "var(--color-primary_text)",
          marginBottom: "24px",
        }}
      >
        음식 정보 수정
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          background: "var(--color-sub_background)",
          padding: "20px",
          borderRadius: "14px",
          border: "1px solid var(--color-border_color)",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            style={{ color: "var(--color-secondary_text)", fontSize: "14px" }}
          >
            음식명
          </span>
          <input
            value={form.foodname}
            onChange={(e) => setForm({ ...form, foodname: e.target.value })}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid var(--color-border_color)",
              fontSize: "16px",
              color: "var(--color-primary_text)",
              background: "var(--color-sub_background)",
            }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            style={{ color: "var(--color-secondary_text)", fontSize: "14px" }}
          >
            칼로리 (kcal)
          </span>
          <input
            type="number"
            value={form.calories}
            onChange={(e) =>
              setForm({ ...form, calories: Number(e.target.value) })
            }
            readOnly
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid var(--color-border_color)",
              fontSize: "16px",
              color: "var(--color-primary_text)",
              background: "var(--color-sub_background)",
            }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            style={{ color: "var(--color-secondary_text)", fontSize: "14px" }}
          >
            섭취량 (인분)
          </span>
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
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid var(--color-border_color)",
              fontSize: "16px",
              color: "var(--color-primary_text)",
              background: "var(--color-sub_background)",
            }}
          />
        </label>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        style={{
          width: "100%",
          marginTop: "24px",
          padding: "14px",
          borderRadius: "10px",
          background: "var(--color-main_color)",
          border: "none",
          color: "#fff",
          fontSize: "16px",
          fontWeight: 600,
          cursor: isSaving ? "not-allowed" : "pointer",
          opacity: isSaving ? 0.6 : 1,
        }}
      >
        {isSaving ? "저장 중..." : "저장하기"}
      </button>
    </div>
  );
};

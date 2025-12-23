import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMeals } from "../../context/MealContext";
import { useEffect, useState } from "react";

export const LogDetailPage = () => {
  const { logs, selectedDate, fetchLogs, deleteFood } = useMeals();
  const { mealId, foodIndex } = useParams();
  const [searchParams] = useSearchParams();
  const [isDeleting, setIsDeleting] = useState(false);

  const dateFromUrl = searchParams.get("date");
  const navigate = useNavigate();

  useEffect(() => {
    // Logs가 없으면 날짜 기반으로 다시 fetch
    if (logs.length === 0) {
      const d = dateFromUrl ? new Date(dateFromUrl) : selectedDate;
      if (d) fetchLogs(d);
    }
  }, []);

  // 백엔드 구조에 맞게 변경
  const meal = logs.find((m) => m.id === Number(mealId));
  const item = meal?.meal_items[Number(foodIndex)];

  // meal 레벨에서 이미지, 시간 추출
  const imageUrl = meal?.image_urls?.[0] ?? "";
  const calories = item?.nutritions?.calories ?? 0;

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    setIsDeleting(true);
    try {
      await deleteFood(Number(mealId), Number(foodIndex));
      // 삭제 후 로그 페이지로 이동
      navigate(`/main/log?date=${dateFromUrl}`);
    } catch (err) {
      alert("삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };
  const handleEdit = () => {
    navigate(`/main/log/${mealId}/${foodIndex}/edit?date=${dateFromUrl}`);
  };

  if (!item) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>해당 음식 정보를 찾을 수 없습니다.</p>
        <button onClick={() => navigate(-1)}>← back</button>
      </div>
    );
  }

  const formatTime = (t) => {
    if (!t) return "";
    const d = new Date(t);
    return `${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

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
          marginBottom: "20px",
        }}
      >
        {item.foodname}
      </h2>

      <img
        src={imageUrl}
        alt={item.foodname}
        style={{
          width: "100%",
          borderRadius: "14px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          background: "var(--color-sub_background)",
          border: "1px solid var(--color-border_color)",
          borderRadius: "14px",
          padding: "20px",
          marginBottom: "28px",
        }}
      >
        <InfoRow label="칼로리" value={`${calories} kcal`} highlight />
        <InfoRow label="섭취량" value={`${item.quantity} 인분`} />
        <InfoRow label="섭취 시간" value={formatTime(meal.eaten_at)} />
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <button
          onClick={handleEdit}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
            background: "var(--color-main_color)",
            border: "none",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          수정하기
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
            background: "var(--color-error_color)",
            border: "none",
            color: "#fff",
            fontSize: "16px",
            cursor: isDeleting ? "not-allowed" : "pointer",
            fontWeight: 600,
            opacity: isDeleting ? 0.6 : 1,
          }}
        >
          {isDeleting ? "삭제 중..." : "삭제하기"}
        </button>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, highlight }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid var(--color-border_color)",
      }}
    >
      <span
        style={{
          color: "var(--color-secondary_text)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontWeight: highlight ? 700 : 500,
          color: highlight
            ? "var(--color-main_color)"
            : "var(--color-primary_text)",
        }}
      >
        {value}
      </span>
    </div>
  );
};

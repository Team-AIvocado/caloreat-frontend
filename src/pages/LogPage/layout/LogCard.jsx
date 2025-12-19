import { Link } from "react-router-dom";
import { useMeals } from "../../../context/MealContext";

export default function LogCard({ item, meal, index }) {
  const { selectedDate } = useMeals();

  // 백엔드 필드명에 맞게 추출
  const { foodname, quantity, nutritions } = item;
  const calories = nutritions?.calories ?? 0;
  const imageUrl = meal.image_urls?.[0] ?? "";

  // selectedDate를 문자열로 변환
  const dateString =
    selectedDate instanceof Date
      ? selectedDate.toISOString().slice(0, 10)
      : selectedDate;

  const formatTime = (t) => {
    if (!t) return "";
    const d = new Date(t);
    return `${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Link
      to={`/main/log/${meal.id}/${index}?date=${dateString}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "16px",
          borderRadius: "14px",
          background: "var(--color-sub_background)",
          border: "1px solid var(--color-border_color)",
          boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          cursor: "pointer",
        }}
      >
        {/* 이미지 영역 */}
        <div
          style={{
            width: "95px",
            height: "95px",
            borderRadius: "10px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={imageUrl}
            alt={foodname}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* 정보 영역 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            flex: 1,
          }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: "17px",
              color: "var(--color-primary_text)",
            }}
          >
            {foodname}
          </span>

          <span
            style={{
              color: "var(--color-secondary_text)",
              fontSize: "14px",
            }}
          >
            {calories} kcal · {quantity} 인분
          </span>

          <span
            style={{
              color: "var(--color-secondary_text)",
              fontSize: "12px",
            }}
          >
            섭취 시간 | {formatTime(meal.eaten_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}

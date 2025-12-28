import { Link } from "react-router-dom";
import { useMeals } from "../../../context/MealContext";

export default function LogCard({ item, meal, index }) {
  const { selectedDate } = useMeals();

  // 백엔드 필드명에 맞게 추출
  const { foodname, quantity, nutritions } = item;
  const calories = Math.round((nutritions?.calories ?? 0) * (quantity ?? 1));
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
      className="no-underline text-inherit w-full"
    >
      {/* shadow 제거 및 border 스타일 유지 */}
      <div className="w-full max-w-full p-4 rounded-lg bg-sub_background border border-border_color flex items-center gap-4 cursor-pointer">
        {/* 이미지 영역 */}
        <div className="w-[95px] h-[95px] rounded-lg overflow-hidden shrink-0 aspect-square">
          <img
            src={imageUrl}
            alt={foodname}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* 정보 영역 */}
        <div className="flex flex-col gap-1.5 flex-1">
          <span className="font-semibold text-[17px] text-primary_text">
            {foodname}
          </span>

          <span className="text-secondary_text text-sm">
            {calories} kcal · {quantity} 인분
          </span>

          <span className="text-secondary_text text-xs">
            섭취 시간 | {formatTime(meal.eaten_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}

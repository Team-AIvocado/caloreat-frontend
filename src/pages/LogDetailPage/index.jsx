import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMeals } from "../../context/MealContext";
import { useEffect, useState } from "react";
import { ConfirmModal } from "../../components/Modal/ConfirmModal";

export const LogDetailPage = () => {
  const { logs, selectedDate, fetchLogs, deleteFood } = useMeals();
  const { mealId, foodIndex } = useParams();
  const [searchParams] = useSearchParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteConfirm(false);
    setIsDeleting(true);
    try {
      await deleteFood(Number(mealId), Number(foodIndex));
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
      <div className="p-5 text-center">
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
    /* min-h-screen 제거하여 불필요한 스크롤 방지 */
    <div className="max-w-[600px] p-6 bg-main_background">
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
      <div className="text-2xl font-semibold ml-5 text-primary_text mb-4">
        {item.foodname}
      </div>

      {/* shadow 제거 */}
      <img
        src={imageUrl}
        alt={item.foodname}
        className="w-full rounded-[14px] mb-4"
      />

      {/* 컴포넌트 간 간격 조정을 통한 스크롤 억제 */}
      <div className="bg-sub_background border border-border_color rounded-[14px] p-5 mb-5">
        <InfoRow label="칼로리" value={`${calories} kcal`} highlight />
        <InfoRow label="섭취량" value={`${item.quantity} 인분`} />
        <InfoRow label="섭취 시간" value={formatTime(meal.eaten_at)} />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleEdit}
          className="flex-1 py-3.5 rounded-[10px] bg-main_color border-none text-white text-base cursor-pointer font-semibold"
        >
          수정하기
        </button>

        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className={`flex-1 py-3.5 rounded-[10px] bg-error_color border-none text-white text-base font-semibold ${
            isDeleting ? "cursor-not-allowed opacity-60" : "cursor-pointer"
          }`}
        >
          {isDeleting ? "삭제 중..." : "삭제하기"}
        </button>
      </div>

      <ConfirmModal
        open={showDeleteConfirm}
        msg="정말 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};

const InfoRow = ({ label, value, highlight }) => {
  return (
    <div className="flex justify-between py-3 border-b border-border_color last:border-b-0">
      <span className="text-secondary_text">{label}</span>
      <span
        className={`${
          highlight
            ? "font-bold text-main_color"
            : "font-medium text-primary_text"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

import { useNavigate, useParams } from "react-router-dom";
import { mockLogs } from "../LogPage/mocks/mockData";

export const LogDetailPage = () => {
  const { mealId, foodIndex } = useParams();
  const navigate = useNavigate();

  // #TODO: 개발 단계에서는 목업 데이터로 상세 페이지를 구성함
  const meal = mockLogs.find((m) => m.meal_id === Number(mealId));
  const food = meal?.foods[Number(foodIndex)];

  /**
   * 실제 서비스 연결 시 데이터 흐름
   * ----------------------------------------------
   * A) LogPage에서 날짜 기준 식단 목록을 API로 가져옴:
   *    GET /api/v1/meals/logs?date=YYYY-MM-DD
   *    → logs 상태에 모든 meal 배열 저장
   *
   * B) LogDetailPage에서는 mockLogs 대신 "전역 상태 logs" 사용:
   *
   *    import { useMeals } from "../../context/MealContext";
   *    const { logs } = useMeals();
   *
   *    const meal = logs.find(m => m.meal_id === Number(mealId));
   *    const food = meal?.foods[Number(foodIndex)];
   *
   * C) 별도 API 호출은 필요 없음
   *    (백엔드 명세에 food 상세 조회 API가 존재하지 않기 때문)
   *
   * D) 만약 나중에 백엔드가 meal 단위 상세조회 API를 제공하면:
   *
   *    useEffect(() => {
   *      fetch(`/api/v1/meals/log/${mealId}`)
   *        .then(res => res.json())
   *        .then(data => {
   *          setFood(data.foods[foodIndex]);
   *        });
   *    }, []);
   *
   * ----------------------------------------------
   * 요약:
   *  - 현재: mockLogs 사용
   *  - 서비스: LogPage → logs 저장 → LogDetailPage에서 logs 참조
   *  - 필요하면 A/B/C/D 중 상황에 맞게 전환하면 됨
   */

  if (!food) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>해당 음식 정보를 찾을 수 없습니다.</p>
        <button onClick={() => navigate(-1)}>← back</button>
      </div>
    );
  }

  const formatTime = (t) => {
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
        {food.name}
      </h2>

      <img
        src={food.image_url}
        alt={food.name}
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
        <InfoRow label="칼로리" value={`${food.kcal} kcal`} highlight />
        <InfoRow label="섭취량" value={`${food.amount} 인분`} />
        <InfoRow label="섭취 시간" value={formatTime(food.created_at)} />
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <button
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
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
            background: "var(--color-error_color)",
            border: "none",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          삭제하기
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

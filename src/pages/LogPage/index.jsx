import { useEffect, useState } from "react";
import DateNavigator from "./layout/DateNavigator";
import { getToday } from "../../utils/date";
import LogCard from "./layout/LogCard";
import { mockLogs } from "./mocks/mockData";
import { useSearchParams } from "react-router-dom";

export const LogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDate = searchParams.get("date") || getToday();
  const [date, setDate] = useState(initialDate);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchLogs(date);
    setSearchParams({ date });
  }, [date]);

  const fetchLogs = async (selectedDate) => {
    setLoading(true);
    // 목업 데이터
    // # TODO: 개발 완료되면 false로 바꾸거나 줄 삭제
    const MOCK_MODE = true;

    if (MOCK_MODE) {
      if (selectedDate === "2025-12-09") {
        setTimeout(() => {
          setLogs(mockLogs);
          setLoading(false);
        }, 300);
        return;
      }
      setLogs([]);
      setLoading(false);
      return;
    }

    // 실제 API 적용시
    try {
      const result = await fetch(`/api/v1/meals/logs?date=${selectedDate}`);
      const data = await result.json();
      setLogs(data);
    } catch (err) {
      console.error("로그 불러오기 실패:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "32px",
        maxWidth: "900px",
        margin: "0 auto",
        background: "var(--color-main_background)",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          color: "var(--color-primary_text)",
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        음식 로그
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <DateNavigator date={date} setDate={setDate} />
      </div>
      {error && (
        <div
          style={{
            textAlign: "center",
            color: "var(--color-error_color)",
            marginTop: "20px",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          데이터를 불러오는 데 문제가 발생했습니다.
        </div>
      )}

      {loading && <div className="loader" />}
      {!loading && logs.length === 0 && !error && (
        <div
          style={{
            marginTop: "50px",
            textAlign: "center",
            color: "var(--color-secondary_text)",
            fontSize: "15px",
            background: "var(--color-sub_background)",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid var(--color-border_color)",
          }}
        >
          <p>아직 기록된 식단이 없습니다.</p>
          <p>상단의 날짜를 선택해 다른 날도 확인해보세요.</p>
        </div>
      )}

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {logs.map((meal) =>
          meal.foods.map((food, idx) => (
            <LogCard
              key={`${meal.meal_id}-${idx}`}
              food={food}
              mealId={meal.meal_id}
              index={idx}
            />
          ))
        )}
      </div>
    </div>
  );
};

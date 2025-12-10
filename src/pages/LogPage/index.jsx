import { useEffect, useState } from "react";
import DateNavigator from "./layout/DateNavigator";
import { getToday } from "../../utils/date";
import LogCard from "./layout/LogCard";
import { mockLogs } from "./mocks/mockData";

export const LogPage = () => {
  const [date, setDate] = useState(getToday());
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchLogs(date);
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
    <div style={{ padding: "20px" }}>
      <h2>음식 로그</h2>
      <DateNavigator date={date} setDate={setDate} />
      {error && (
        <div
          style={{
            textAlign: "center",
            color: "red",
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          데이터를 불러오는 데 문제가 발생했습니다.
        </div>
      )}

      {loading && <div className="loader" />}
      {!loading && logs.length === 0 && !error && (
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            color: "#999",
            fontSize: "14px",
          }}
        >
          <p>아직 기록된 식단이 없습니다.</p>
          <p>상단의 날짜를 선택해 다른 날도 확인해보세요.</p>
        </div>
      )}

      <div>
        {logs.map((meal) =>
          meal.foods.map((food, idx) => (
            <LogCard
              key={`${meal.meal_id}-${idx}`}
              food={food}
              mealId={meal.meal_id}
            />
          ))
        )}
      </div>
    </div>
  );
};

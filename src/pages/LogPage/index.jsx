import { useEffect, useState } from "react";

export default function LogPage() {
  const [date, setDate] = useState(getToday());
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogs(date);
  }, [date]);

  const fetchLogs = async (selectedDate) => {
    setLoading(true);
    try {
      const result = await fetch("/api/v1/meals/logs?date=${selectedDate");
      const data = await result.json();
      setLogs(data);
    } catch (err) {
      console.error("로그 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>음식 로그</h2>
      <p>{date}</p>

      {loading && <p>불러오는 중...</p>}
      {!loading && logs.length === 0 && <p>기록이 없습니다.</p>}

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
}

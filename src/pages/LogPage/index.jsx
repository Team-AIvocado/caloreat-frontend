import { useEffect, useState } from "react";
import DateNavigator from "./layout/DateNavigator";
import { getToday } from "../../utils/date";
import LogCard from "./layout/LogCard";
import { useSearchParams } from "react-router-dom";
import { useMeals } from "../../context/MealContext";

export const LogPage = () => {
  const { logs, loading, error, selectedDate, setSelectedDate, fetchLogs } =
    useMeals();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDate = searchParams.get("date") || getToday();
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    fetchLogs(date);
    setSearchParams({ date });
  }, [date]);

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

import { useEffect, useState } from "react";
import DateNavigator from "./layout/DateNavigator";
import { useSearchParams } from "react-router-dom";
import { useMeals } from "../../context/MealContext";
import LogCard from "./layout/LogCard";

export const LogPage = () => {
  const { logs, loading, error, fetchLogs } = useMeals();

  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 날짜 읽기 → 문자열
  const urlDateParam = searchParams.get("date");

  // 문자열을 Date 객체로 변환
  const initialDate = urlDateParam ? new Date(urlDateParam) : new Date();

  // 내부 date는 항상 Date 객체로 유지해야 CalendarModal이 정상 동작함
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    fetchLogs(date);

    // URL에는 문자열로 넣어야 하므로 포맷 변환 (Local Time)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formatted = `${year}-${month}-${day}`;
    setSearchParams({ date: formatted });
  }, [date]);

  return (
    <div
      className="px-4 py-8 md:px-8"
      style={{
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

      {/* 날짜 네비게이터 (CalendarModal 포함) */}
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

      {/* 로그 카드 */}
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
          meal.meal_items.map((item, idx) => (
            <LogCard
              key={`${meal.id}-${idx}`}
              item={item}
              meal={meal}
              index={idx}
            />
          ))
        )}
      </div>
    </div>
  );
};

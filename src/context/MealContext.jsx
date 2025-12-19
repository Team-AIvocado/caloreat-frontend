import { createContext, useContext, useState } from "react";
import { api } from "../api/axios.js";

const MealContext = createContext(null);

export const MealProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = async (date) => {
    setLoading(true);
    setSelectedDate(date);
    setError(null);

    try {
      // Date 객체 → "YYYY-MM-DD" 문자열로 변환
      const dateString = date.toISOString().slice(0, 10);

      const response = await api.get("/meals/logs", {
        params: { date: dateString },
      });

      // API 응답이 배열인지 확인하고, 객체면 data 속성에서 추출
      const data = response.data;
      const logsData = Array.isArray(data) ? data : (data?.data ?? []);
      setLogs(logsData);
    } catch (err) {
      console.error("로그 불러오기 실패:", err);
      setError(err);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (mealId, itemIndex) => {
    const meal = logs.find((m) => m.id === mealId);
    if (!meal) return;

    // 해당 item을 제외한 새 배열 생성
    const updatedItems = meal.meal_items.filter((_, idx) => idx !== itemIndex);

    try {
      await api.put(`/meals/log/${mealId}`, {
        meal_type: meal.meal_type,
        eaten_at: meal.eaten_at,
        meal_items: updatedItems.map((item) => ({
          foodname: item.foodname,
          quantity: item.quantity,
          nutritions: item.nutritions,
        })),
      });

      // 성공 시 로컬 상태 업데이트
      const updated = logs.map((m) =>
        m.id === mealId ? { ...m, meal_items: updatedItems } : m
      );
      setLogs(updated);
    } catch (err) {
      console.error("음식 삭제 실패:", err);
      throw err;
    }
  };

  const updateFood = async (mealId, itemIndex, updatedFields) => {
    const meal = logs.find((m) => m.id === mealId);
    if (!meal) return;

    // 해당 item을 수정한 새 배열 생성
    const updatedItems = meal.meal_items.map((item, idx) =>
      idx === itemIndex ? { ...item, ...updatedFields } : item
    );

    try {
      await api.put(`/meals/log/${mealId}`, {
        meal_type: meal.meal_type,
        eaten_at: meal.eaten_at,
        meal_items: updatedItems.map((item) => ({
          foodname: item.foodname,
          quantity: item.quantity,
          nutritions: item.nutritions,
        })),
      });

      // 성공 시 로컬 상태 업데이트
      const updated = logs.map((m) =>
        m.id === mealId ? { ...m, meal_items: updatedItems } : m
      );
      setLogs(updated);
    } catch (err) {
      console.error("음식 수정 실패:", err);
      throw err;
    }
  };

  return (
    <MealContext.Provider
      value={{
        logs,
        setLogs,
        selectedDate,
        setSelectedDate,
        loading,
        error,
        fetchLogs,
        deleteFood,
        updateFood,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMeals = () => useContext(MealContext);

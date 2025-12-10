import { createContext, useContext, useState } from "react";

const MealContext = createContext(null);

export const MealProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = async (date) => {
    setLoading(true);
    setSelectedDate(date);

    try {
      const MOCK_MODE = true;

      if (MOCK_MODE) {
        const { mockLogs } = await import(
          "../pages/LogPage/mocks/mockData.jsx"
        );

        if (date === "2025-12-09") {
          setLogs(mockLogs);
        } else {
          setLogs([]);
        }

        setLoading(false);
        return;
      }

      const response = await fetch(`/api/v1/meals/logs?date=${date}`);
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      console.error("로그 불러오기 실패:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = (mealId, foodIndex) => {
    const updated = logs.map((meal) => {
      if (meal.meal_id !== mealId) return meal;

      return {
        ...meal,
        foods: meal.foods.filter((_, idx) => idx !== foodIndex),
      };
    });

    setLogs(updated);
  };

  const updateFood = (mealId, foodIndex, updatedFields) => {
    const updated = logs.map((meal) => {
      if (meal.meal_id !== mealId) return meal;

      const foods = [...meal.foods];
      foods[foodIndex] = {
        ...foods[foodIndex],
        ...updatedFields,
      };

      return { ...meal, foods };
    });

    setLogs(updated);
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

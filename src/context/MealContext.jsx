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
      const MOCK_MODE = false; // import.meta.env.VITE_MOCK_MODE === 'true';

      if (MOCK_MODE) {
        const { mockLogs } = await import("../pages/LogPage/mocks/mockData.js");

        const targetDate = new Date("2025-12-09");
        const isSameDate = date.toDateString() === targetDate.toDateString();

        if (isSameDate) {
          setLogs(mockLogs);
        } else {
          setLogs([]);
        }

        setLoading(false);
        return;
      }

      // Use local time for date string
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const response = await fetch(`/api/v1/meals/logs?date=${formattedDate}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const mappedData = Array.isArray(data)
        ? data.map((log) => ({
            meal_id: log.id,
            eaten_at: log.eaten_at,
            meal_type: log.meal_type,
            foods: log.meal_items.map((item) => ({
              name: item.foodname,
              kcal: item.nutritions?.calories || 0,
              amount: item.quantity,
              created_at: item.created_at || log.created_at,
              image_url: log.image_urls?.[0] || "", // Use first image for now
            })),
          }))
        : [];

      setLogs(mappedData);
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

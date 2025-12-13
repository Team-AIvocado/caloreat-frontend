import { api } from "../api/axios";

const generateMockStats = (type, date, goal) => {
  // Randomize slightly for demo
  const baseCalories = 1800 + Math.floor(Math.random() * 500);
  const carbs = 200 + Math.floor(Math.random() * 50);
  const protein = 100 + Math.floor(Math.random() * 30);
  const fat = 60 + Math.floor(Math.random() * 20);

  let chartData = [];
  if (type === "weekly") {
    // Generate 7 days of data
    for (let i = 0; i < 7; i++) {
      const d = new Date(date);
      d.setDate(d.getDate() - (6 - i)); // Last 7 days including today
      chartData.push({
        name: ["일", "월", "화", "수", "목", "금", "토"][d.getDay()],
        calories: 1500 + Math.floor(Math.random() * 1000),
        goal: goal,
      });
    }
  } else if (type === "monthly") {
    // Generate 4 weeks of data
    for (let i = 1; i <= 4; i++) {
      chartData.push({
        name: `${i}주`,
        calories: 1500 + Math.floor(Math.random() * 1000),
        goal: goal,
      });
    }
  }

  return {
    type,
    date: date.toISOString().split("T")[0],
    totalCalories: baseCalories,
    nutrients: {
      carbs: { amount: carbs, percentage: 50 },
      protein: { amount: protein, percentage: 30 },
      fat: { amount: fat, percentage: 20 },
    },
    chartData: chartData,
  };
};

export const fetchDailyStats = async (date, goal) => {
  // try {
  //   const response = await api.get(`/stats/daily?date=${date}`);
  //   return response.data;
  // } catch (e) {
  //   console.log("failed to fetch daily stats", e);
  // }

  return generateMockStats("daily", new Date(date), goal);
};

export const fetchWeeklyStats = async (startDate, goal) => {
  // try {
  //   const response = await api.get(`/stats/weekly?startDate=${startDate}`);
  //   return response.data;
  // } catch (e) {
  //   console.log("failed to fetch weekly stats", e);
  // }

  return generateMockStats("weekly", new Date(startDate), goal);
};

export const fetchMonthlyStats = async (year, month, goal) => {
  // try {
  //   const response = await api.get(`/stats/monthly?year=${year}&month=${month}`);
  //   return response.data;
  // } catch (e) {
  //   console.log("failed to fetch monthly stats", e);
  // }

  return generateMockStats("monthly", new Date(year, month - 1, 1), goal);
};

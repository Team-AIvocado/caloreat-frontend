import { api } from "../api/axios";

export const fetchDailyStats = async (date) => {
  try {
    const formattedDate =
      date instanceof Date ? date.toISOString().split("T")[0] : date;
    const response = await api.get(`/stats/day?date=${formattedDate}`);
    const data = response.data;

    // Transform backend data to frontend structure
    const total = data.total || { calorie: 0, carb: 0, protein: 0, fat: 0 };
    const percentages = calculatePercentages(
      total.carb,
      total.protein,
      total.fat
    );

    return {
      type: "daily",
      date: data.date,
      totalCalories: total.calorie,
      nutrients: {
        carbs: { amount: total.carb, percentage: percentages.carbs },
        protein: { amount: total.protein, percentage: percentages.protein },
        fat: { amount: total.fat, percentage: percentages.fat },
        // Default values for missing backend fields
        sugar: 0,
        fiber: 0,
        sodium: 0,
        cholesterol: 0,
        saturated_fat: 0,
      },
      chartData: (data.hourly || []).map((h) => ({
        name: `${h.hour}:00`,
        calories: h.calorie,
      })),
      dailyLogs: [], // Backend doesn't return logs yet
    };
  } catch (e) {
    console.log("failed to fetch daily stats", e);
    // 에러 발생 시 빈 데이터 반환 또는 에러 처리
    throw e;
  }
};

export const fetchWeeklyStats = async (startDate) => {
  try {
    const formattedDate =
      startDate instanceof Date
        ? startDate.toISOString().split("T")[0]
        : startDate;
    const response = await api.get(`/stats/week?start_date=${formattedDate}`);
    // If backend isn't ready, throw to use mock
    if (!response.data) throw new Error("No data");

    // Placeholder transformation if backend eventually returns data
    return response.data;
  } catch (e) {
    console.log("failed to fetch weekly stats", e);
    throw e;
  }
};

export const fetchMonthlyStats = async (year, month) => {
  try {
    const response = await api.get(`/stats/month?year=${year}&month=${month}`);
    const data = response.data;

    const total = data.total || { calorie: 0, carb: 0, protein: 0, fat: 0 };
    const percentages = calculatePercentages(
      total.carb,
      total.protein,
      total.fat
    );

    return {
      type: "monthly",
      date: `${year}-${month}`,
      totalCalories: total.calorie,
      nutrients: {
        carbs: { amount: total.carb, percentage: percentages.carbs },
        protein: { amount: total.protein, percentage: percentages.protein },
        fat: { amount: total.fat, percentage: percentages.fat },
        sugar: 0,
        fiber: 0,
        sodium: 0,
        cholesterol: 0,
        saturated_fat: 0,
      },
      chartData: (data.daily || []).map((d, index) => ({
        name: `${index + 1}일`,
        calories: d.calorie,
        goal: goal,
      })),
      dailyLogs: [],
    };
  } catch (e) {
    console.log("failed to fetch monthly stats", e);
    throw e;
  }
};

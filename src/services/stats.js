import { api } from "../api/axios";

const generateMockStats = (type, date, goal) => {
  // Randomize slightly for demo
  const baseCalories = 1800 + Math.floor(Math.random() * 500);
  const carbs = 200 + Math.floor(Math.random() * 50);
  const protein = 100 + Math.floor(Math.random() * 30);
  const fat = 60 + Math.floor(Math.random() * 20);

  // New nutrients
  const sugar = 30 + Math.floor(Math.random() * 20);
  const fiber = 15 + Math.floor(Math.random() * 10);
  const sodium = 1500 + Math.floor(Math.random() * 1000);
  const cholesterol = 150 + Math.floor(Math.random() * 100);
  const saturated_fat = 15 + Math.floor(Math.random() * 10);

  let chartData = [];

  let dailyLogs = [];

  if (type === "daily") {
    const foods = [
      "김치찌개",
      "쌀밥",
      "계란말이",
      "사과",
      "닭가슴살 샐러드",
      "고구마",
    ];

    const logCount = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < logCount; i++) {
      // Generate random time between 08:00 and 20:00
      const hour = 8 + Math.floor(Math.random() * 12);
      const minute = Math.floor(Math.random() * 60);
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;

      let mealType = "간식";
      if (hour >= 6 && hour < 11) mealType = "아침";
      else if (hour >= 11 && hour < 15) mealType = "점심";
      else if (hour >= 17 && hour < 21) mealType = "저녁";

      dailyLogs.push({
        id: i,
        mealType: mealType,
        timestamp: timeString,
        name: foods[Math.floor(Math.random() * foods.length)],
        calories: 200 + Math.floor(Math.random() * 500),
      });
    }
    // Sort by timestamp
    dailyLogs.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  }

  if (type === "weekly") {
    // Generate 7 days of data
    for (let i = 0; i < 7; i++) {
      const d = new Date(date);
      d.setDate(d.getDate() - (6 - i)); // Last 7 days including today
      const dayName = `${d.getMonth() + 1}/${d.getDate()}`;
      chartData.push({
        name: dayName,
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
      sugar: sugar,
      fiber: fiber,
      sodium: sodium,
      cholesterol: cholesterol,
      saturated_fat: saturated_fat,
    },
    chartData: chartData,
    dailyLogs: dailyLogs,
  };
};

const calculatePercentages = (carbs, protein, fat) => {
  const totalWeight = carbs + protein + fat;
  if (totalWeight === 0) return { carbs: 0, protein: 0, fat: 0 };
  return {
    carbs: Math.round((carbs / totalWeight) * 100),
    protein: Math.round((protein / totalWeight) * 100),
    fat: Math.round((fat / totalWeight) * 100),
  };
};

export const fetchDailyStats = async (date, goal) => {
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
    return generateMockStats("daily", new Date(date), goal);
  }
};

export const fetchWeeklyStats = async (startDate, goal) => {
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
    return generateMockStats("weekly", new Date(startDate), goal);
  }
};

export const fetchMonthlyStats = async (year, month, goal) => {
  try {
    const response = await api.get(
      `/stats/month?year=${year}&month=${month}`
    );
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
        goal: goal
      })),
      dailyLogs: []
    };
  } catch (e) {
    console.log("failed to fetch monthly stats", e);
    return generateMockStats("monthly", new Date(year, month - 1, 1), goal);
  }
};

import { api } from "../api/axios";

export const fetchDailyStats = async (date) => {
  try {
    const formattedDate =
      date instanceof Date ? date.toISOString().split("T")[0] : date;
    const response = await api.get(`/stats/daily?date=${formattedDate}`);
    return response.data;
  } catch (e) {
    console.error("failed to fetch daily stats", e);
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
    const response = await api.get(`/stats/weekly?startDate=${formattedDate}`);
    return response.data;
  } catch (e) {
    console.error("failed to fetch weekly stats", e);
    throw e;
  }
};

export const fetchMonthlyStats = async (year, month) => {
  try {
    const response = await api.get(
      `/stats/monthly?year=${year}&month=${month}`
    );
    return response.data;
  } catch (e) {
    console.error("failed to fetch monthly stats", e);
    throw e;
  }
};

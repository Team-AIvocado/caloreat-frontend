import { TotalKcal } from "./layout/TotalKcal";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import {
  fetchDailyStats,
  fetchMonthlyStats,
  fetchWeeklyStats,
} from "../../services/stats";
import { CPFChart } from "./layout/CPFChart";
import { NutritionChart } from "./layout/NutritionChart";
import { DailyLog } from "./layout/DailyLog";
import { Summary } from "./layout/Summary";
import { ConditionAlert } from "./layout/ConditionAlert";

export const StatisticsPage = () => {
  const { calculateBMR } = useAuth();
  const [activeTab, setActiveTab] = useState("daily");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const goalCalories = calculateBMR();

  // Calculate Goals
  const goals = {
    sugar: (goalCalories * 0.1) / 4, // 10% of calories, 4kcal/g
    fiber: (goalCalories / 1000) * 14, // 14g per 1000kcal
    sodium: 2000, // 2000mg (standard limit)
    cholesterol: 300, // 300mg (standard limit)
    saturated_fat: (goalCalories * 0.1) / 9, // 10% of calories, 9kcal/g
  };

  const calculateStatus = (value, goal, isLimit = false) => {
    if (!goal) return "충분";
    const ratio = value / goal;
    if (isLimit) {
      if (ratio < 0.5) return "부족";
      if (ratio <= 1.0) return "충분";
      return "과다";
    } else {
      //islimit : 절대적인 섭취량
      if (ratio < 0.8) return "부족";
      if (ratio <= 1.2) return "충분";
      return "과다";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data = null;
      try {
        if (activeTab === "daily") {
          data = await fetchDailyStats(currentDate, goalCalories);
        } else if (activeTab === "weekly") {
          data = await fetchWeeklyStats(currentDate, goalCalories);
        } else {
          data = await fetchMonthlyStats(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            goalCalories
          );
        }
        setStatsData(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, currentDate]);

  const handleDateChange = (direction) => {
    const newDate = new Date(currentDate);
    if (activeTab === "daily") {
      newDate.setDate(newDate.getDate() + direction);
    } else if (activeTab === "weekly") {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else {
      newDate.setMonth(newDate.getMonth() + direction);
    }

    // Prevent future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(newDate);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate > today) return;

    setCurrentDate(newDate);
  };

  const isFuture = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let nextDate = new Date(currentDate);
    if (activeTab === "daily") {
      nextDate.setDate(nextDate.getDate() + 1);
    } else if (activeTab === "weekly") {
      nextDate.setDate(nextDate.getDate() + 7);
    } else {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }
    nextDate.setHours(0, 0, 0, 0);

    return nextDate > today;
  };

  const formatDateDisplay = () => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    if (activeTab === "daily") {
      return currentDate.toLocaleDateString("ko-KR", options);
    } else if (activeTab === "weekly") {
      const lastDay = new Date(currentDate);
      const firstDay = new Date(currentDate);
      firstDay.setDate(lastDay.getDate() - 6);

      return `${firstDay.toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      })} - ${lastDay.toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      })}`;
    } else {
      return currentDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "short",
      });
    }
  };

  return (
    <>
      <div className="pt-7 pb-5 text-center text-2xl text-secondary_text">
        통계
      </div>
      <div className="flex flex-col items-center w-full px-4  pb-20 bg-main_background min-h-screen">
        <div className="flex w-full max-w-[600px] bg-white rounded-xl p-1 mb-6 border border-sub_border">
          {["daily", "weekly", "monthly"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 text-sm rounded-lg ${
                activeTab === tab
                  ? "bg-main_color text-white"
                  : "text-secondary_text hover:bg-sub_background"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentDate(new Date());
              }}
            >
              {tab === "daily" ? "일" : tab === "weekly" ? "주" : "월"}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between w-full max-w-[600px] mb-6 px-4">
          <button
            onClick={() => handleDateChange(-1)}
            className="p-2 text-secondary_text hover:text-primary_text font-bold text-xl"
          >
            &lt;
          </button>
          <div className="text-lg font-bold text-primary_text flex items-center gap-2 relative">
            {formatDateDisplay()}
            {activeTab === "daily" && (
              <>
                <input
                  type="date"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  onChange={(e) => {
                    if (e.target.value) {
                      const selected = new Date(e.target.value);
                      if (selected <= new Date()) {
                        setCurrentDate(selected);
                      }
                    }
                  }}
                  max={new Date().toISOString().split("T")[0]}
                />
              </>
            )}
          </div>
          <button
            onClick={() => handleDateChange(1)}
            className={`p-2 font-bold text-xl ${
              isFuture()
                ? "text-gray-300 cursor-not-allowed"
                : "text-secondary_text hover:text-primary_text"
            }`}
            disabled={isFuture()}
          >
            &gt;
          </button>
        </div>

        {loading || !statsData ? (
          <div className="text-secondary_text mt-10">Loading...</div>
        ) : (
          <div className="w-full max-w-[600px] flex flex-col gap-4">
            <TotalKcal
              totalCalories={statsData.totalCalories}
              goalCalories={goalCalories}
              type={activeTab}
              chartData={statsData.chartData}
            />
            <CPFChart stats={statsData} type={activeTab} />
            <NutritionChart
              stats={statsData}
              goals={goals}
              calculateStatus={calculateStatus}
            />
            {activeTab === "daily" ? (
              <DailyLog logs={statsData.dailyLogs} />
            ) : (
              <Summary stats={statsData} goalCalories={goalCalories} />
            )}

            <ConditionAlert
              totalCalories={statsData.totalCalories}
              goalCalories={goalCalories}
              nutritions={statsData.nutrients}
              goals={goals}
              calculateStatus={calculateStatus}
            />
          </div>
        )}
      </div>{" "}
    </>
  );
};

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export const NutritionChart = ({ stats, goalCalories }) => {
  if (!stats || !stats.nutrients) return null;

  const { sugar, fiber, sodium, cholesterol, saturated_fat } = stats.nutrients;

  // Calculate Goals
  const goals = {
    sugar: (goalCalories * 0.1) / 4, // 10% of calories, 4kcal/g
    fiber: (goalCalories / 1000) * 14, // 14g per 1000kcal
    sodium: 2000, // 2000mg (standard limit)
    cholesterol: 300, // 300mg (standard limit)
    saturated_fat: (goalCalories * 0.1) / 9, // 10% of calories, 9kcal/g
  };

  const calculateStatus = (value, goal, isLimit = false) => {
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

  const getBarColor = (status) => {
    switch (status) {
      case "부족":
        return "#ffe2c1";
      case "충분":
        return "#A6F2E8";
      case "과다":
        return "#ff6b6b";
      default:
        return "#dcdcdc";
    }
  };

  const data = [
    {
      name: "당류",
      key: "sugar",
      value: sugar,
      goal: goals.sugar,
      unit: "g",
      isLimit: true,
    },
    {
      name: "식이섬유",
      key: "fiber",
      value: fiber,
      goal: goals.fiber,
      unit: "g",
      isLimit: false,
    },
    {
      name: "나트륨",
      key: "sodium",
      value: sodium,
      goal: goals.sodium,
      unit: "mg",
      isLimit: true,
    },
    {
      name: "콜레스테롤",
      key: "cholesterol",
      value: cholesterol,
      goal: goals.cholesterol,
      unit: "mg",
      isLimit: true,
    },
    {
      name: "포화지방",
      key: "saturated_fat",
      value: saturated_fat,
      goal: goals.saturated_fat,
      unit: "g",
      isLimit: true,
    },
  ];

  const chartData = data.map((item) => {
    return {
      ...item,
      percentage: Math.round((item.value / item.goal) * 100),
      displayPercentage: `${Math.round((item.value / item.goal) * 100)}%`,
      status: calculateStatus(item.value, item.goal, item.isLimit),
      barValue: Math.min(Math.round((item.value / item.goal) * 100), 100),
    };
  });

  return (
    <div className="bg-white rounded-xl p-7 border border-sub_border w-full mt-4 ">
      <div className="flex text-primary_text text-xl pl-5 pt-4">
        <div className="text-primary_text ">필수 영양분</div>
        <div className="flex pl-10 items-end gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#ffe2c1]"></div>
            <span className="text-secondary_text">부족</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#A6F2E8] "></div>
            <span className="text-secondary_text">충분</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#ff6b6b]"></div>
            <span className="text-secondary_text">과다</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[260px] flex justify-center">
        <div className="w-[95%] h-full pt-5">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              barSize={16}
            >
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                dataKey="name"
                type="category"
                width={70}
                tick={{ fontSize: 12, fill: "#1d2e50" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="displayPercentage"
                type="category"
                orientation="right"
                yAxisId="right"
                width={56}
                tick={{ fontSize: 12, fill: "#6c6c6c" }}
                axisLine={false}
                tickLine={false}
              />
              <Bar
                dataKey="barValue"
                radius={[0, 10, 10, 0]}
                background={{ fill: "#f4f6fa", radius: [0, 10, 10, 0] }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(entry.status)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

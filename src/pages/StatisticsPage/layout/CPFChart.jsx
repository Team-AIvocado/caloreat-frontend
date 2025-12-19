import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = {
  carbs: "var(--color-icon_color1)",
  protein: "var(--color-icon_color2)",
  fat: "var(--color-icon_color3)",
};

export const CPFChart = ({ stats, type }) => {
  const { carbs, protein, fat } = stats.nutrients;

  const data = [
    { name: "탄수화물", value: carbs.amount, fill: COLORS.carbs },
    { name: "단백질", value: protein.amount, fill: COLORS.protein },
    { name: "지방", value: fat.amount, fill: COLORS.fat },
  ];

  const total = carbs.amount + protein.amount + fat.amount;

  const renderLegendItem = (label, value, color, percentage) => (
    <div className="flex items-center justify-between mb-2 text-xs w-full">
      <div className="flex items-center">
        <div
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: color }}
        ></div>
        <span className="text-secondary_text">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold text-primary_text">{value}g</span>
        <span className="text-third_text w-8 text-right">{percentage}%</span>
      </div>
    </div>
  );

  return (
    <div className="bg-sub_background rounded-xl p-5 border-3 border-sub_border w-full">
      <div className="text-primary_text text-xl pl-5 pt-4">
        {type === "daily" ? "총 섭취량" : "평균 섭취량"}
      </div>

      <div className="flex flex-col items-center">
        <div className="w-44 h-44 relative mb-6">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={0}
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={78}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-xs text-secondary_text">Total</span>
            <span className="text-sm font-bold text-primary_text">
              {total}g
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full max-w-[180px] items-start">
          {renderLegendItem(
            "탄수화물",
            carbs.amount,
            COLORS.carbs,
            Math.round((carbs.amount / total) * 100) || 0
          )}
          {renderLegendItem(
            "단백질",
            protein.amount,
            COLORS.protein,
            Math.round((protein.amount / total) * 100) || 0
          )}
          {renderLegendItem(
            "지방",
            fat.amount,
            COLORS.fat,
            Math.round((fat.amount / total) * 100) || 0
          )}
        </div>
      </div>
    </div>
  );
};

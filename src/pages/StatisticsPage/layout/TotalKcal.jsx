import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const TotalKcal = ({ totalCalories, goalCalories, type, chartData }) => {
  const percentage = Math.round((totalCalories / goalCalories) * 100);
  const goalName = `목표 ${goalCalories}kcal`;

  return (
    <div className="bg-white rounded-xl p-3 border-3 border-sub_border w-full mb-4 flex flex-col">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="text-primary_text text-xl pl-5 pt-4">
          {type === "daily" ? "총 칼로리" : "평균 칼로리"}
        </div>
      </div>

      {type === "daily" ? (
        <div className="flex flex-col justify-center py-4">
          <div className="text-5xl font-bold text-primary_text text-center">
            {totalCalories} kcal
          </div>
          <div className="text-sm text-primary_text mt-5 text-right pr-4">
            <div className="pr-2 text-lg">
              목표<span className="text-main_color"> {goalCalories} </span>kcal
            </div>
            <div className="text-xs text-secondary_text">
              (목표 대비 <span className=" underline">{percentage}</span> %)
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-64">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={0}
          >
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Legend wrapperStyle={{ fontSize: "14px" }} align="right" />
              <Line
                dataKey="calories"
                barSize={17}
                fill="#413ea0"
                name="섭취 칼로리"
                type="monotone"
              />
              <Bar dataKey="goal" barSize={17} fill="#A3A3A3" name={goalName} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

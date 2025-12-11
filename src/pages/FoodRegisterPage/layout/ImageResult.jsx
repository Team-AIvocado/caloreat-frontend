import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export const ImageResult = ({ imgSrc, foodDetail }) => {
  const navigate = useNavigate();
  const [intake, setIntake] = useState(1);
  const [chartData, setChartData] = useState([]);

  const result = foodDetail.results[0] || {};

  const {
    foodname,
    calories,
    carbs,
    protein,
    fat,
    nutritions = {},
    micronutrients = {},
  } = result;

  useEffect(() => {
    const currentCarbs = Math.round(carbs * intake);
    const currentProtein = Math.round(protein * intake);
    const currentFat = Math.round(fat * intake);

    const totalMicronutrients = Math.round(
      Object.values(micronutrients).reduce((total, cur) => total + cur, 0) *
        intake
    );

    setChartData([
      { name: "탄수화물", value: currentCarbs, fill: "#bec9ff" },
      { name: "단백질", value: currentProtein, fill: "#cfe7ff" },
      { name: "지방", value: currentFat, fill: "#ffe2c1" },
      { name: "영양소", value: totalMicronutrients, fill: "#d9e3f3" },
    ]);
  }, [intake, carbs, protein, fat, micronutrients, nutritions]);

  const onSave = () => {
    navigate("/main/dashboard");
  };

  const handleSliderChange = (event, newValue) => {
    setIntake(newValue);
  };

  const intakeMarks = [
    { value: 0, label: "0" },
    { value: 0.5, label: "0.5" },
    { value: 1, label: "1" },
    { value: 1.5, label: "1.5" },
    { value: 2, label: "2" },
  ];

  return (
    <div className="w-full flex flex-col items-center px-4 pb-10">
      <div className="pt-24 pb-11 text-center text-2xl text-secondary_text ">
        분석결과 보기
      </div>

      <div className="w-full max-w-[600px] bg-white rounded-xl border-3 border-sub_border p-6 md:p-6">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-start">
          <img
            className="w-40 h-40 md:w-48 md:h-48 rounded-xl border border-border_color object-cover "
            src={imgSrc}
            alt={foodname}
            draggable="false"
          />
          <div className="flex flex-col justify-between w-full pt-2 h-auto md:h-48 mb-7">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-primary_text mb-2">
                {foodname}
              </h2>
              <div className="text-secondary_text text-sm">
                1인분 ({calories}kcal) 기준
              </div>
            </div>

            <div className="w-full p-4">
              <div className="text-lg font-semibold text-primary_text">
                섭취량
              </div>
              <div className="text-sm text-secondary_text mb-2 pl-2">
                : {intake}인분
              </div>
              <Slider
                value={intake}
                min={0}
                max={2}
                step={0.5}
                marks={intakeMarks}
                onChange={handleSliderChange}
                sx={{
                  color: "#3a7dff",
                }}
              />
            </div>

            <div className="text-xl text-main_color font-bold text-right">
              {Math.round(calories * intake)}{" "}
              <span className="text-secondary_text text-base font-normal">
                kcal
              </span>
            </div>
          </div>
        </div>

        <div className="w-full h-48 mb-4 ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              key={intake}
              layout="vertical"
              data={chartData}
              margin={{
                top: 5,
                right: 50,
                left: 20,
                bottom: 5,
              }}
              barSize={15}
            >
              <XAxis type="number" hide padding={{ right: 20 }} />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 12 }}
                width={60}
                axisLine={false}
                tickLine={false}
              />
              <Bar
                dataKey="value"
                radius={[0, 5, 5, 0]}
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(value) => `${value}g`}
                  style={{ fill: "#1d2e50", fontSize: "12px" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <button
        className=" bg-main_color w-1/3 max-w-[300px] text-white rounded-lg px-8 py-2 mt-5 text-sm cursor-pointer"
        onClick={onSave}
      >
        기록 저장하기
      </button>
    </div>
  );
};

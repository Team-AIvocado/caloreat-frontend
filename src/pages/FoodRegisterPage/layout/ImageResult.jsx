import { Slider } from "@mui/material";
import { useState } from "react";
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
import { createMealLog } from "../../../services/meal";

export const ImageResult = ({ imgSrc, foodDetail, imageId }) => {
  const navigate = useNavigate();
  const [intake, setIntake] = useState(1);

  // Lazy init for mealType based on current time
  const [mealType, setMealType] = useState(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "breakfast";
    if (hour >= 11 && hour < 17) return "lunch";
    if (hour >= 17 && hour < 22) return "dinner";
    return "snack";
  });

  const result = foodDetail?.results?.[0] || {};

  const {
    foodname = "",
    calories = 0,
    carbs = 0,
    protein = 0,
    fat = 0,
    nutritions = {},
    micronutrients = {},
  } = result;

  // Derived state (No useEffect needed)
  const currentCarbs = Math.round(carbs * intake);
  const currentProtein = Math.round(protein * intake);
  const currentFat = Math.round(fat * intake);
  const totalMicronutrients = Math.round(
    Object.values(micronutrients || {}).reduce((total, cur) => total + cur, 0) *
      intake
  );

  const chartData = [
    { name: "탄수화물", value: currentCarbs, fill: "#bec9ff" },
    { name: "단백질", value: currentProtein, fill: "#cfe7ff" },
    { name: "지방", value: currentFat, fill: "#ffe2c1" },
    { name: "영양소", value: totalMicronutrients, fill: "#d9e3f3" },
  ];

  const showWarning = (nutritions.sugar || 0) * intake > 30;

  const onSave = async () => {
    try {
      await createMealLog({
        meal_type: mealType,
        eaten_at: new Date().toISOString(),
        meal_items: [
          {
            foodname: foodname,
            quantity: intake,
            nutritions: {
              calories: Math.round(calories * intake),
              carbs: Math.round(carbs * intake),
              protein: Math.round(protein * intake),
              fat: Math.round(fat * intake),
              ...nutritions,
            },
          },
        ],
        tmp_image_ids: imageId ? [imageId] : [],
      });
      navigate("/main/dashboard");
    } catch (e) {
      console.error(e);
      alert("식단 저장에 실패했습니다.");
    }
  };

  const handleSliderChange = (_event, newValue) => {
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
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-center md:items-start">
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

        <div className="w-full h-40 ">
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
              barSize={12}
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
                  style={{ fill: "#6c6c6c", fontSize: "12px" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showWarning && (
        <div className="w-full max-w-[600px] mt-4 py-8 pl-10 pr-4 bg-light-alert border border-light-alert-border rounded-xl flex items-center gap-3">
          <div className="text-xl">⚠️</div>
          <div className="text-primary_text text-sm">
            <span className="font-bold">주의:</span> 당류 섭취량이 높습니다.
            조절이 필요할 수 있습니다.
          </div>
        </div>
      )}

      {/* Meal Type Selector */}
      <div className="flex gap-2 mt-8 mb-4">
        {[
          { label: "아침", value: "breakfast" },
          { label: "점심", value: "lunch" },
          { label: "저녁", value: "dinner" },
          { label: "간식", value: "snack" },
        ].map((type) => (
          <button
            key={type.value}
            onClick={() => setMealType(type.value)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              mealType === type.value
                ? "bg-main_color text-white"
                : "bg-white text-secondary_text border border-border_color"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <button
        className=" bg-main_color w-1/3 max-w-[300px] text-white rounded-lg px-8 py-2 mt-2 text-sm cursor-pointer"
        onClick={onSave}
      >
        기록 저장하기
      </button>
    </div>
  );
};

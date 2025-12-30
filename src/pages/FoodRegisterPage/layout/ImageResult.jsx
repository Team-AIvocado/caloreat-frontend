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
import { backBtn } from "../../../utils/styles";
import { useAlert } from "../../../context/AlertContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import dayjs from "dayjs";

export const ImageResult = ({ imgSrc, foodDetail, imageId, setResultMode }) => {
  const navigate = useNavigate();
  const [intake, setIntake] = useState(1);
  const [loading, setLoading] = useState(false);
  const { showAlert, closeAlert } = useAlert();
  const [eatenAt, setEatenAt] = useState(dayjs());
  const [showClock, setShowClock] = useState(false);

  // 현재 시간에 따른 식사 타입 초기 설정 (아침, 점심, 저녁, 간식)
  const [mealType, setMealType] = useState(() => {
    const hour = dayjs().hour();
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
    sugar = 0,
    sodium = 0,
    nutritions = {},
  } = result;

  const currentCarbs = Math.round(carbs * intake);
  const currentProtein = Math.round(protein * intake);
  const currentFat = Math.round(fat * intake);
  const currentSugar = Math.round(sugar * intake);
  const currentSodium = Math.round(sodium * intake) / 1000;

  const chartData = [
    { name: "탄수화물", value: currentCarbs, fill: "#bec9ff" },
    { name: "단백질", value: currentProtein, fill: "#cfe7ff" },
    { name: "지방", value: currentFat, fill: "#ffe2c1" },
    { name: "당류", value: currentSugar, fill: "#d9e3f3" },
    { name: "나트륨", value: currentSodium, fill: "#b1f3eb" },
  ];

  //TODO:로직 추가 경고창 출력, 예시
  const showWarning = (nutritions.sodium || 0) * intake > 5;

  const onSave = async () => {
    setLoading(true);
    try {
      await createMealLog({
        meal_type: mealType,
        eaten_at: eatenAt.toISOString(),
        meal_items: [
          {
            foodname: foodname,
            quantity: intake,
            nutritions: {
              calories: calories,
              carbs: carbs,
              protein: protein,
              fat: fat,
              ...nutritions,
            },
          },
        ],
        tmp_image_ids: imageId ? [imageId] : [],
      });
      navigate("/main/dashboard");
    } catch (e) {
      console.error(e);
      showAlert({
        msg: "식단 저장에 실패했습니다.",
        hasNavbar: true,
        footer: (
          <div className="flex justify-center">
            <button className={backBtn} onClick={closeAlert}>
              닫기
            </button>
          </div>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSliderChange = (_event, newValue) => {
    setIntake(newValue);
  };

  const intakeMarks = [
    { value: 0.5, label: "0.5" },
    { value: 1, label: "1" },
    { value: 1.5, label: "1.5" },
    { value: 2, label: "2" },
    { value: 2.5, label: "2.5" },
    { value: 3, label: "3" },
  ];

  return (
    <div className="w-full flex flex-col items-center px-4 pb-3">
      <div className="w-full max-w-[600px] flex justify-start mb-4">
        <button
          onClick={() => setResultMode(false)}
          className="text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="w-full max-w-[600px] bg-white rounded-lg border-2 border-sub_border px-4 md:p-6">
        <div className="flex flex-row md:flex-row gap-6 pt-3 items-center md:items-start">
          <img
            className="w-40 h-40 md:w-48 md:h-48 rounded-lg border border-border_color object-cover "
            src={imgSrc}
            alt={foodname}
            draggable="false"
          />
          <div className="flex flex-col justify-between w-full pt-2 h-auto md:h-48">
            <div className=" md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-primary_text mb-2">
                {foodname}
              </h2>
              <div className="text-secondary_text text-sm">
                1인분 ({calories}kcal) 기준
              </div>
              <div className="mt-4 relative">
                <div
                  className="text-lg font-semibold text-main_color cursor-pointer hover:bg-sub_background px-2 py-1 rounded transition-colors inline-block"
                  onClick={() => setShowClock(!showClock)}
                >
                  {eatenAt.format("hh:mm A")}
                </div>
                {showClock && (
                  <div
                    className="md:pl-52 fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setShowClock(false)}
                  >
                    <div
                      className="bg-white border border-border_color rounded-lg p-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MultiSectionDigitalClock
                          value={eatenAt}
                          onChange={(newValue) => {
                            setEatenAt(newValue);
                          }}
                          sx={{
                            "& .MuiMenuItem-root": {
                              padding: "4px 8px",
                            },
                          }}
                        />
                        <div className="flex justify-end mt-2 pt-2 border-t border-border_color">
                          <button
                            onClick={() => setShowClock(false)}
                            className="text-sm text-main_color font-bold px-4 py-2 hover:bg-sub_background rounded"
                          >
                            확인
                          </button>
                        </div>
                      </LocalizationProvider>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-4">
          <div className="text font-semibold text-primary_text">섭취량</div>
          <div className="text-sm text-secondary_text mb-2 pl-2">
            : {intake}인분
          </div>
          <Slider
            value={intake}
            min={0.5}
            max={3}
            step={0.5}
            marks={intakeMarks}
            onChange={handleSliderChange}
            sx={{
              color: "#27D0C3",
            }}
          />
        </div>

        <div className="text-xl text-main_color font-bold text-right">
          {Math.round(calories * intake)}{" "}
          <span className="text-secondary_text text-base font-normal">
            kcal
          </span>
        </div>

        <div className="w-full h-40 mb-7">
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
        <div className="w-full max-w-[600px] mt-4 py-8 pl-10 pr-4 bg-light-alert border border-light-alert-border rounded-lg flex items-center gap-3">
          <div className="text-xl">⚠️</div>
          <div className="text-primary_text text-sm">
            <span className="font-bold">주의:</span> 당류 섭취량이 높습니다.
            조절이 필요할 수 있습니다.
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-5 mb-4">
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
        className=" bg-main_color w-2/3 max-w-[300px] text-white rounded-lg px-8 py-2 mt-2 text-sm cursor-pointer disabled:bg-gray-400"
        onClick={onSave}
        disabled={loading}
      >
        {loading ? "저장 중..." : "기록 저장하기"}
      </button>
    </div>
  );
};

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
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import dayjs from "dayjs";
import { TailSpin } from "react-loader-spinner";
import { liquidKeywords } from "../../../utils/food";

export const ImageResult = ({ imgSrc, foodDetail, imageId }) => {
  const navigate = useNavigate();
  const results = foodDetail?.results || [];

  //일단 액체임을 판단하는 기준을 하드코딩
  const isLiquid = (name) => {
    return liquidKeywords.some((keyword) => name.includes(keyword));
  };

  const getBaseWeight = (food) => {
    const { carbs = 0, protein = 0, fat = 0, sugar = 0, sodium = 0 } = food;
    const total = carbs + protein + fat + sugar + sodium / 1000;
    return Math.max(Math.round(total), 100); // Default to 100 if sum is too small
  };

  // Initialize intakes: 모든 음식을 1인분(1.0)으로 초기화
  const [intakes, setIntakes] = useState(results.map(() => 1.0));
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

  // Calculate total nutrients across all foods
  const totalNutrients = results.reduce(
    (acc, food, index) => {
      const ratio = intakes[index]; // intakes가 이제 인분(servings) 단위임

      acc.calories += (food.calories || 0) * ratio;
      acc.carbs += (food.carbs || 0) * ratio;
      acc.protein += (food.protein || 0) * ratio;
      acc.fat += (food.fat || 0) * ratio;
      acc.sugar += (food.sugar || 0) * ratio;
      acc.sodium += (food.sodium || 0) * ratio;
      return acc;
    },
    { calories: 0, carbs: 0, protein: 0, fat: 0, sugar: 0, sodium: 0 }
  );

  const chartData = [
    {
      name: "탄수화물",
      value: Math.round(totalNutrients.carbs),
      fill: "#bec9ff",
    },
    {
      name: "단백질",
      value: Math.round(totalNutrients.protein),
      fill: "#cfe7ff",
    },
    { name: "지방", value: Math.round(totalNutrients.fat), fill: "#ffe2c1" },
    { name: "당류", value: Math.round(totalNutrients.sugar), fill: "#d9e3f3" },
    {
      name: "나트륨",
      value: Math.round(totalNutrients.sodium / 1000),
      fill: "#b1f3eb",
    },
  ];

  // 성인 적정 섭취량 기준 경고 로직 (당류 25g, 나트륨 1000mg, 지방 30g 초과 시)
  const warningReasons = [];
  if (totalNutrients.sugar > 25) warningReasons.push("당류");
  if (totalNutrients.sodium > 1000) warningReasons.push("나트륨");
  if (totalNutrients.fat > 30) warningReasons.push("지방");

  const showWarning = warningReasons.length > 0;

  const onSave = async () => {
    setLoading(true);
    try {
      const mealItems = results.map((food, index) => ({
        foodname: food.foodname,
        quantity: intakes[index],
        nutritions: {
          calories: food.calories,
          carbs: food.carbs,
          protein: food.protein,
          fat: food.fat,
          ...food.nutritions,
        },
      }));

      await createMealLog({
        meal_type: mealType,
        eaten_at: eatenAt.toISOString(),
        meal_items: mealItems,
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

  const handleSliderChange = (index, newValue) => {
    const newIntakes = [...intakes];
    const food = results[index];
    if (isLiquid(food.foodname)) {
      // 액체인 경우 슬라이더 값이 ml이므로 인분으로 변환하여 저장
      newIntakes[index] = newValue / getBaseWeight(food);
    } else {
      // 일반 음식인 경우 슬라이더 값이 인분이므로 그대로 저장
      newIntakes[index] = newValue;
    }
    setIntakes(newIntakes);
  };

  // 액체용 ml 마크
  const liquidMarks = [
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 150, label: "150" },
    { value: 200, label: "200" },
    { value: 250, label: "250" },
    { value: 300, label: "300" },
    { value: 350, label: "350" },
    { value: 400, label: "400" },
  ];

  // 일반 음식용 인분 마크
  const foodMarks = [
    { value: 0.5, label: "0.5" },
    { value: 1, label: "1" },
    { value: 1.5, label: "1.5" },
    { value: 2, label: "2" },
    { value: 2.5, label: "2.5" },
    { value: 3, label: "3" },
  ];

  const allFoodNames = results.map((f) => f.foodname).join(", ");

  const formatEatenAt = (date) => {
    const formatted = date.format("A hh:mm");
    return formatted.replace("AM", "오전").replace("PM", "오후");
  };

  return (
    <div className="w-full flex flex-col items-center px-4 pb-3">
      {loading && (
        <div className="fixed inset-0 bg-white/80 z-100 flex flex-col items-center justify-center">
          <TailSpin color="#27d0c3" height={80} width={80} />
          <p className="mt-4  text-secondary_text font-semibold text-lg">
            기록 저장중입니다..
          </p>
        </div>
      )}
      <div className="w-full max-w-[600px] bg-white rounded-lg border-2 border-sub_border px-4 md:p-6 mt-4">
        <div className="flex flex-row gap-4 pt-3 items-center md:items-start">
          <img
            className="w-36 h-36 md:w-48 md:h-48 rounded-lg border border-border_color object-cover "
            src={imgSrc}
            alt={allFoodNames}
            draggable="false"
          />
          <div className="flex flex-col justify-between w-full pt-2 h-auto md:h-48">
            <div className="ml-5 md:mb-0">
              <h2 className="text-xl md:text-2xl font-bold text-primary_text mb-2 wrap-break-word">
                {allFoodNames}
              </h2>
              <div className="text-secondary_text text-sm">
                총 {Math.round(totalNutrients.calories)}kcal
              </div>
              <div className="mt-4 relative">
                <div
                  className="text-lg font-semibold text-main_color cursor-pointer hover:bg-sub_background px-2 py-1 rounded transition-colors inline-block"
                  onClick={() => setShowClock(!showClock)}
                >
                  {formatEatenAt(eatenAt)}
                </div>
                {showClock && (
                  <div
                    className="md:pl-52 fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setShowClock(false)}
                  >
                    <div
                      className="bg-white border border-border_color rounded-lg p-4 max-w-[90vw] max-h-[90vh] overflow-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker
                          displayStaticWrapperAs="mobile"
                          // 시간과 분만 변경 가능하도록 설정
                          views={["hours", "minutes"]}
                          value={eatenAt}
                          onChange={(newValue) => {
                            setEatenAt(newValue);
                          }}
                          onAccept={() => setShowClock(false)}
                          onClose={() => setShowClock(false)}
                          slotProps={{
                            actionBar: {
                              actions: ["accept"],
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sliders for each food */}
        <div className="w-full mt-6 space-y-6">
          {results.map((food, index) => {
            const baseWeight = getBaseWeight(food);
            const liquid = isLiquid(food.foodname);
            const unit = liquid ? "ml" : "인분";

            // 표시용 값 계산
            const displayValue = liquid
              ? Math.round(intakes[index] * baseWeight)
              : intakes[index];

            return (
              <div
                key={index}
                className="w-full p-2 border-b border-sub_border last:border-none"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="text font-semibold text-primary_text wrap-break-word flex-1 mr-2">
                    {food.foodname}
                  </div>
                  <div className="text-sm text-secondary_text whitespace-nowrap">
                    : {displayValue}
                    {unit}{" "}
                    {!liquid && `(${Math.round(intakes[index] * baseWeight)}g)`}
                  </div>
                </div>
                <div className="text-[10px] text-secondary_text mb-2">
                  1인분({baseWeight}
                  {liquid ? "ml" : "g"}) = {Math.round(food.calories)}kcal
                </div>
                <Slider
                  value={displayValue}
                  min={liquid ? 50 : 0.5}
                  max={liquid ? 400 : 3}
                  step={liquid ? 50 : 0.5}
                  marks={liquid ? liquidMarks : foodMarks}
                  onChange={(_e, val) => handleSliderChange(index, val)}
                  sx={{
                    color: "#27D0C3",
                    "& .MuiSlider-mark": {
                      backgroundColor: "#27D0C3",
                    },
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="text-xl text-main_color font-bold text-right mt-4">
          {Math.round(totalNutrients.calories)}{" "}
          <span className="text-secondary_text text-base font-normal">
            kcal
          </span>
        </div>

        <div className="w-full h-32 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              key={JSON.stringify(intakes)}
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
                  formatter={(value, name) =>
                    name === "나트륨" ? `${value}mg` : `${value}g`
                  }
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
          <div className="text-primary_text text-sm whitespace-nowrap">
            <span className="font-semibold">{warningReasons.join(", ")}</span>{" "}
            섭취량의 조절이 필요할 수 있습니다.
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
        기록 저장하기
      </button>
    </div>
  );
};

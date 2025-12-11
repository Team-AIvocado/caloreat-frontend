import { Slider } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ImageResult = ({ imgSrc, foodDetail }) => {
  const navigate = useNavigate();
  const [intake, setIntake] = useState(1);

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
      <div className="pt-24 pb-11 text-center text-2xl text-secondary_text">
        분석결과 보기
      </div>

      <div className="w-full max-w-[600px] bg-white rounded-xl border-2 border-sub_border p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-start">
          <img
            className="w-40 h-40 md:w-48 md:h-48 rounded-xl border border-border_color object-cover shadow-sm"
            src={imgSrc}
            draggable="false"
            alt={foodname}
          />
          <div className="flex flex-col justify-between w-full pt-2">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-primary_text mb-2">
                {foodname}
              </h2>
              <div className="text-secondary_text text-sm">
                1인분 ({calories}kcal) 기준
              </div>
            </div>

            <div className="w-full pr-4 mb-9">
              <div className="text-primary_text text-lg mt-5 pl-2 font-semibold">
                섭취량
              </div>
              <div className="text-sm text-secondary_text ml-4 mb-2">
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

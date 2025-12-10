import { useNavigate } from "react-router-dom";

export const ImageResult = ({ imgSrc, foodDetail }) => {
  const navigate = useNavigate();

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
          <div className="flex flex-col justify-center items-center md:items-start w-full pt-2">
            <h2 className="text-2xl md:text-3xl font-bold text-primary_text mb-2">
              {foodname}
            </h2>
            <div className="text-xl text-main_color font-bold">
              {calories}{" "}
              <span className="text-secondary_text text-base font-normal">
                kcal
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        className="w-full max-w-[600px] bg-main_color text-white rounded-xl py-4 mt-6 text-base font-bold hover:bg-blue-600 transition-colors shadow-md cursor-pointer"
        onClick={onSave}
      >
        기록 저장하기
      </button>
    </div>
  );
};

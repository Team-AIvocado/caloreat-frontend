import { useNavigate } from "react-router-dom";
import RingProgressBar from "../../components/ProgressBar/RingProgressBar";
import { useEffect, useState } from "react";
import { getTotalKcal } from "../../services/meal";

export const DashBoardPage = () => {
  //TODO: 사용자의 오늘의 음식 기록 가져오기

  const [todayData, setTodayData] = useState("");
  const navigate = useNavigate();

  const onFoodReg = () => {
    navigate("/main/foodreg");
  };

  useEffect(() => {
    const fetchDayTotal = async () => {
      try {
        const res = await getTotalKcal();
        if (res) {
          setTodayData(res);
          console.log(res);
        }
      } catch {
        console.log("failed to get todays kcal");
      }
    };
    fetchDayTotal();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="pt-24 pb-11 text-center text-2xl text-primary_text">
        오늘의 누적 칼로리
      </div>
      <RingProgressBar totalkcal={2400} kcal={360} />
      <div className="border w-full max-w-100 border-sub_color px-8 py-3 pb-3 mt-6 rounded-lg bg-sub_background">
        {/* TODO: 불러온 하루 음식 로그 list 형식으로 출력 */}
        {/* 일단 하드코딩 */}
        <div className="text-secondary_text w-full flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-lg text-primary_text pr-6 font-bold">아침</div>
            <div>샌드위치</div>
          </div>
          <div className="text-primary_text font-light">360kcal</div>
        </div>
        <div className="text-secondary_text w-full flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-lg text-primary_text pr-6 font-bold">간식</div>
            <div>커피</div>
          </div>
          <div className="text-primary_text font-light">0kcal</div>
        </div>
      </div>

      <button
        className="bg-main_color text-white rounded-lg px-8 py-2 mt-5 text-sm cursor-pointer"
        onClick={onFoodReg}
      >
        기록하기
      </button>
    </div>
  );
};

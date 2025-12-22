import { useNavigate } from "react-router-dom";
import { alertBtn } from "../../../utils/styles";

export const LoginComp = ({ logout, nickname, userInfo }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="border flex flex-col md:flex-row border-sub_color px-6 md:px-10 py-8 rounded-lg bg-white/60 dark:bg-sub_background w-full max-w-md items-center">
        <div className="text-primary_text text-bold text-sm whitespace-pre-line text-center md:text-left flex-1">
          <div className="font-bold text-main_color text-xl mb-4">
            {nickname}님의 Caloreat!
          </div>
          <div className="pt-2 leading-relaxed">
            오늘 먹은 음식을 기록하면,
            {"\n"}칼로리와 영양소를 분석해드려요!
          </div>
        </div>

        <button
          className="bg-main_color text-white rounded-lg py-3 px-6 mt-8 md:mt-0 md:ml-6 text-sm cursor-pointer whitespace-nowrap w-full md:w-auto"
          onClick={async () => {
            try {
              await logout();
            } catch (e) {
              console.error("failed to logout", e);
            }
          }}
        >
          로그아웃
        </button>
      </div>
      {userInfo ? (
        <button
          className={`${alertBtn} mt-8 cursor-pointer w-full max-w-md py-4 px-10 whitespace-nowrap !border-main_color !text-white`}
          onClick={() => navigate("/main/dashboard")}
        >
          홈으로
        </button>
      ) : (
        <button
          className={`${alertBtn} mt-8 cursor-pointer w-full max-w-md py-4 px-10 whitespace-nowrap !border-main_color !text-white`}
          onClick={() => navigate("/userinfo")}
        >
          서비스 시작하기!
        </button>
      )}
    </div>
  );
};

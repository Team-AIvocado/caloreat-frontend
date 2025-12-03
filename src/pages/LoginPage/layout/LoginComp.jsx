export const LoginComp = ({ logout, nickname, userInfo }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="border flex flex-row border-sub_color px-10 py-5 rounded-lg  bg-white/60 ml-8">
        <div className="text-primary_text text-bold text-sm whitespace-pre-line">
          <span className="font-bold text-main_color text-lg">
            {nickname}님의 Caloreat!
          </span>
          <div className="pl-2 pt-3 text-end">
            오늘 먹은 음식을 기록하면,
            {"\n"}칼로리와 영양소를 분석해
            {"\n"}필요한 건강 정보를 알려드려요
          </div>
        </div>

        <button
          className="bg-main_color text-white rounded-lg px-3 py-2 mt-10 ml-10 text-sm cursor-pointer"
          onClick={async () => {
            try {
              await logout();
            } catch (e) {
              console.log("failed to logout", e);
            }
          }}
        >
          로그아웃
        </button>
      </div>
      {userInfo ? <button>홈으로</button> : <button>서비스 시작하기!</button>}
    </div>
  );
};

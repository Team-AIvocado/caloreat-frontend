export const LoginComp = ({ logout }) => {
  return (
    <div className="flex flex-row ml-6">
      <div className="pr-16 pb-7 font-bold text-main_color">로그인 완료</div>
      <button
        className="bg-main_color text-white rounded-lg ml-7 px-3 py-2 mt-20 text-sm cursor-pointer"
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
  );
};

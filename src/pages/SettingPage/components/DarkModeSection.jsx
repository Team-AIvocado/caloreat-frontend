import { useEffect, useState } from "react";
/* 다크모드 on/off 토글 UI제공 (모바일 스타일)
   isDarkmode 상태로 현재 테마를 관리
   localStorage값을 저장하는 방식으로 새로고침/재접속해도 유지
   여기선 토글만 담당하고 적용은 App.jsx 담당 */
const DarkModeSection = () => {
    // 다크모드 여부를 나타내는 로컬 상태
    // false = 라이트 모드, true = 다크 모드
    const [isDarkMode, setIsDarkMode] = useState(false);

    /* 컴포넌트 렌더링 시 실행되는 부분
       1. localStorage에서 테마값을 읽어온다.
       2. 저장된 값이 dark라면, isDarkMode 상태를 true로 변경
       -> 새로고침해도 상태 복원 가능 */
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);
    /* 다크모드 토글 함수
       버튼/영역 클릭 시 호출
       이전 상태를 기준으로 반전된 값을 계산
       -> next가 true라면 dark 클래스를 추가하고 로컬에 저장
       -> next가 false라면 dark 클래스를 제거하고 로컬에 light 저장
       -> next값을 반환해서 isDarkMode 갱신 */
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
            return next;
        });
    };
    /*아이콘은 코드화 시켜주는 사이트 https://lucide.dev/ 참고 
      bg-white : 라이트모드 기본 배경
      dark:bg-gray-800 : 다크모드일 때 배경을 어두운 회색으로
      transition-colors / duration-200 : 라이트/다크 전환 시 부드러운 색 전환*/
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-200">
            {/* 상단 한 줄에 아이콘 + 텍스트 + 토글 스위치를 배치하고
            onClick={toggleDarkMode}을 걸어서 영역을 눌러도 토글되게 단순화  */}
            <div className="flex items-center justify-between cursor-pointer" onClick={toggleDarkMode}>
                {/* 왼쪽: 아이콘 + 텍스트 */}
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isDarkMode ? 'bg-indigo-100 text-indigo-500' : 'bg-orange-100 text-orange-500'}`}>
                        {isDarkMode ? (
                          // 다크모드일 때 보여줄 달 아이콘
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                            </svg>
                        ) : (
                          // 라이트모드일 때 보여줄 해 아이콘
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2" />
                                <path d="M12 20v2" />
                                <path d="m4.93 4.93 1.41 1.41" />
                                <path d="m17.66 17.66 1.41 1.41" />
                                <path d="M2 12h2" />
                                <path d="M20 12h2" />
                                <path d="m6.34 17.66-1.41 1.41" />
                                <path d="m19.07 4.93-1.41 1.41" />
                            </svg>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-white text-lg">
                            {isDarkMode ? "Dark Mode" : "Light Mode"}
                        </span>
                    </div>
                </div>
                {/* Right: Toggle Switch */}
                <div className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={() => { }} // Handle change via parent div onClick
                        className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
            </div>
        </div>
    );
};
export default DarkModeSection;
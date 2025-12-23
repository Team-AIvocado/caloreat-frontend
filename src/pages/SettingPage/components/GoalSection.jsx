import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAlert } from "../../../context/AlertContext";
import { updateGoal } from "../../../services/users";

const GoalSection = () => {
    // 전역 사용자 정보와 최신 정보 갱신 함수 불러오기
    const { userInfo, checkPreInfo } = useAuth();
    const { showAlert } = useAlert();
    // 로컬 상태 : 선택된 목표 저장
    const [selectedGoal, setSelectedGoal] = useState("");
    // 로컬 로딩 상태 
    const [isLoading, setIsLoading] = useState(false);

    // userinfo에 기존 목표가 있다면 초기값으로 세팅
    useEffect(() => {
        if (userInfo?.goal_type) {
            setSelectedGoal(userInfo.goal_type);
        }
    }, [userInfo]);

    // 목표 선택 시 실행
    // 같은 목표 클릭 시 불필요한 API 호출 방지
    const handleUpdate = async (newGoal) => {
        // 이미 선택된 목표면 갱신 안 함
        if (newGoal === selectedGoal) return;

        setIsLoading(true);
        try {
            // 1. 백엔드에 목표 변경 요청
            await updateGoal(newGoal);
            // 2. 전역 사용자 정보 동기화
            await checkPreInfo();
            // 3. 로컬 상태 갱신
            setSelectedGoal(newGoal);

            showAlert({ msg: "목표가 변경되었습니다." });
        } catch (error) {
            console.error("업데이트 실패", error);
            showAlert({ msg: "목표 변경에 실패했습니다." });
        } finally {
            setIsLoading(false);
        }
    };

    // 선택 가능한 목표 옵션 목록
    const goals = [
        { id: "loss", label: "체중 감량", desc: "체지방을 줄이고 싶어요" },
        { id: "maintain", label: "현재 유지", desc: "지금 상태를 유지하고 싶어요" },
        { id: "gain", label: "체중 증량", desc: "근육량을 늘리고 싶어요" },
    ];

    return (
        <div className="bg-sub_background p-6 rounded-lg shadow-sm">
            {/* 섹션 제목 */}
            <h2 className="text-xl font-bold mb-4 text-primary_text">목표 설정</h2>

            {/* 목표 선택 버튼들 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {goals.map((goal) => (
                    <button
                        key={goal.id}
                        onClick={() => handleUpdate(goal.id)}
                        disabled={isLoading}
                        className={`
                            p-4 rounded-lg border-2 text-left transition-all
                            ${selectedGoal === goal.id
                                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-400" // 선택됨
                                : "border-gray-200 hover:border-blue-200 dark:border-gray-600 dark:hover:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"      // 비선택
                            }
                            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                    >
                        <div className="font-bold mb-1">{goal.label}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{goal.desc}</div>
                    </button>
                ))}
            </div>

            {/* 선택 저장 중 UI */}
            {isLoading && (
                <div className="text-sm text-blue-500 mt-2 text-right">
                    변경 사항을 저장 중입니다...
                </div>
            )}
        </div>
    );
};

export default GoalSection;
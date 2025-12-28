import React, { useState, useEffect } from "react";
import { updateGoal } from "../../../services/users";
/* 목표 유형 정의 */
const GOAL_TYPES = [
  { value: "loss", label: "체중 감량" },
  { value: "maintain", label: "체중 유지" },
  { value: "gain", label: "체중 증량" },
];

export const GoalSection = ({ initialGoal }) => {
  /* 현재 선택된 목표 상태 */
  const [selectedGoal, setSelectedGoal] = useState(initialGoal || "diet");
  /* 목표 변경 결과에 대한 메세지 */
  const [message, setMessage] = useState("");

  /* initialGoal 변경 시 state 동기화 */
  useEffect(() => {
    if (initialGoal) {
      setSelectedGoal(initialGoal);
    }
  }, [initialGoal]);

  /* 목표 클릭 시 실행 */
  const handleUpdate = async (newGoal) => {
    setSelectedGoal(newGoal);
    try {
      /* 서버에 목표 변경 요청 */
      await updateGoal(newGoal);
      setMessage("목표가 변경되었습니다.");
    } catch (error) {
      /* 실패 시 메세지 표시 */
      setMessage("목표 변경에 실패했습니다.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg mb-4 border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">목표 설정</h3>
      <div className="flex flex-col gap-2">
        {GOAL_TYPES.map((goal) => (
          <label
            key={goal.value}
            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
              selectedGoal === goal.value
                ? "border-main_color bg-green-50 text-main_color font-bold"
                : "border-gray-200 hover:bg-gray-50 text-gray-600"
            }`}
            onClick={() => handleUpdate(goal.value)}
          >
            <input
              type="radio"
              name="goal"
              value={goal.value}
              checked={selectedGoal === goal.value}
              onChange={() => {}}
              className="hidden"
            />
            <span className="flex-1">{goal.label}</span>
            {selectedGoal === goal.value && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
        ))}
      </div>
      {message && (
        <p className="text-sm text-blue-600 mt-2 text-center animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
};

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { updateConditions } from "../../../services/users";

const DiseaseSection = () => {
    // 전역 사용자 정보, 최신 정보 갱신 함수 불러오기
    const { userInfo, checkPreInfo } = useAuth();
    // 로컬 상태 : 선택된 질환 리스트
    const [selectedConditions, setSelectedConditions] = useState([]);
    // API 요청 시 로딩 상태
    const [isLoading, setIsLoading] = useState(false);

    // 컴포넌트 초기 렌더링 시 실행
    // 백엔드에서 받은 userinfo.conditions를 그대로 로컬상태에 적용
    useEffect(() => {
        if (userInfo?.conditions) {
            setSelectedConditions(userInfo.conditions); 
        }
    }, [userInfo]);  
    
    // 체크박스 토글 처리
    // 이미 선택된 id면 제거, 없으면 추가
    const handleToggle = (conditionId) => {
        setSelectedConditions((prev) => {
            if (prev.includes(conditionId)) {
                return prev.filter((id) => id !== conditionId); // 제거
            } else {
                return [...prev, conditionId]; 
            }
        });
    };

    // 저장 버튼 클릭 시 실행
    // updateConditions()로 백엔드에 저장
    // checkPreInfo()로 전역 상태 다시 가져오기
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            // 1. 백엔드에 선택된 질환 배열 전달
            await updateConditions(selectedConditions);

            // 2. 전역 사용자 정보 갱신
            await checkPreInfo();

            alert("건강 정보가 수정되었습니다.");
        } catch (error) {
            console.error("업데이트 실패", error);
            alert("수정에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    // UI에서 표시할 질환 목록 배열
    // id : 백엔드에 저장되는 실제 값
    // label/desc : 화면에 보여지는 이름/설명
    const conditionsList = [
        { id: "diabetes", label: "당뇨", desc: "혈당 관리가 필요해요" },
        { id: "hypertension", label: "고혈압", desc: "나트륨 조절이 필요해요" },
        { id: "hyperlipidemia", label: "고지혈증", desc: "지방 섭취 주의가 필요해요" },
        { id: "none", label: "없음/해당사항 없음", desc: "특별한 질환이 없어요" },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            {/* 제목 */}
            <h2 className="text-xl font-bold mb-4">질환 및 건강 정보</h2>

            {/* 설명 */}
            <p className="text-gray-500 mb-4 text-sm">
                해당하는 항목을 모두 선택해주세요.
            </p>

            {/* 질환 선택 목록 */}
            <div className="space-y-3 mb-6">
                {conditionsList.map((item) => (
                    <div
                        key={item.id}
                        className={`
                            flex items-center p-3 border rounded-lg cursor-pointer transition-all
                            ${
                                selectedConditions.includes(item.id)
                                    ? "border-blue-500 bg-blue-50" // 선택됨
                                    : "border-gray-200 hover:border-blue-200" // 선택되지 않음
                            }
                        `}
                        onClick={() => handleToggle(item.id)}
                    >
                        {/* 체크박스 (div 클릭으로 상태 제어하므로 onChange는 비워둠) */}
                        <input
                            type="checkbox"
                            checked={selectedConditions.includes(item.id)}
                            onChange={() => {}}
                            // accent-color를 이용하여 확실하게 체크박스 색 고정
                            className="h-5 w-5 accent-blue-600 rounded focus:ring-blue-500"
                        />

                        {/* 질환 이름 + 설명 */}
                        <div className="ml-3">
                            <span className="font-medium text-gray-900 block">{item.label}</span>
                            <span className="text-sm text-gray-500">{item.desc}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 저장 버튼 */}
            <div className="flex justify-end">
                <button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {isLoading ? "저장 중..." : "저장"}
                </button>
            </div>
        </div>
    );
};

export default DiseaseSection;
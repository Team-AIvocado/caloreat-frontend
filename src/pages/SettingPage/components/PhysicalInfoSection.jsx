import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAlert } from "../../../context/AlertContext";
import { updatePhysicalInfo } from "../../../services/users";
import { alertBtn } from "../../../utils/styles";

const PhysicalInfoSection = () => {
  // 전역 상태에서 사용자 기본프로필과 갱신 함수 가져오기
  const { userInfo, checkPreInfo } = useAuth();
  const { showAlert, closeAlert } = useAlert();
  // 키, 몸무게를 관리할 로컬 상태값
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
  });
  // 저장 버튼의 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // userinfo가 로드되면 localstate에 기본값을 초기 세팅
  useEffect(() => {
    if (userInfo) {
      setFormData({
        height: userInfo.height || "",
        weight: userInfo.weight || "",
      });
    }
  }, [userInfo]);

  // input값 변경 핸들러 (height, weight 공통 처리)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 신체 정보 업데이트 실행 함수
  const handleUpdate = async () => {
    // 빈값 방지 검증
    if (!formData.height || !formData.weight) {
      showAlert({
        msg: "키와 몸무게를 입력해주세요.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
      return;
    }

    // 변경사항 없음 검증
    if (
      Number(formData.height) === userInfo.height &&
      Number(formData.weight) === userInfo.weight
    ) {
      showAlert({
        msg: "변경된 내용이 없습니다.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
      return;
    }

    setIsLoading(true);
    try {
      // 1. 백엔드에 사용자 신체정보 업데이트 API 요청
      await updatePhysicalInfo(formData.height, formData.weight);
      // 2. 전역 프로필 정보 갱신
      await checkPreInfo();

      showAlert({
        msg: "신체 정보가 수정되었습니다.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
    } catch (error) {
      console.error("업데이트 실패", error);
      showAlert({
        msg: "수정에 실패하였습니다.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // gender를 한글로 변환하여 표시
  const formatGender = (gender) => {
    if (gender === "male") return "남성";
    if (gender === "female") return "여성";
    return gender;
  };

  return (
    <div className="bg-sub_background p-6 rounded-lg shadow-sm">
      {/* 섹션 제목 */}
      <h2 className="text-xl font-bold mb-4 text-primary_text">
        신체 정보 설정
      </h2>

      <div className="space-y-4">
        {/* 성별 / 생년월일 (읽기 전용 정보) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary_text mb-1">
              성별
            </label>
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-100">
              {userInfo?.gender ? formatGender(userInfo.gender) : "-"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary_text mb-1">
              생년월일
            </label>
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-100">
              {userInfo?.birthdate || "-"}
            </div>
          </div>
        </div>

        {/* 수정 가능한 신체 입력 값들 (키/몸무게) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary_text mb-1">
              키 (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              placeholder="cm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary_text mb-1">
              몸무게 (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              placeholder="kg"
            />
          </div>
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
    </div>
  );
};

export default PhysicalInfoSection;

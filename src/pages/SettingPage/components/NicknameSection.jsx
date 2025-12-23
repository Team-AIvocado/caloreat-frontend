import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAlert } from "../../../context/AlertContext";
import { updateNickname } from "../../../services/users";
import { alertBtn } from "../../../utils/styles";

const NicknameSection = () => {
  const { user, setUser } = useAuth(); // 전역 상태 업데이트용
  const { showAlert, closeAlert } = useAlert();
  const [nickname, setNickname] = useState(user?.nickname || ""); // 초기값 안전하게 할당
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdate = async () => {
    if (!nickname.trim()) {
      showAlert({
        msg: "새 닉네임을 작성해주세요.",
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
      // nickname 서비스 함수 호출
      await updateNickname(nickname);

      setUser({ ...user, nickname: nickname });
      showAlert({
        msg: "닉네임이 변경되었습니다.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
    } catch (error) {
      console.error("업데이트 실패", error);
      showAlert({
        msg: "변경에 실패했습니다.",
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
  return (
    <div className="bg-sub_background p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-primary_text">닉네임 설정</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border p-2 rounded flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-main_color"
          disabled={isLoading}
        />
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 whitespace-nowrap min-w-fit"
        >
          {isLoading ? "변경 중..." : "변경"}
        </button>
      </div>
    </div>
  );
};
export default NicknameSection;

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { updateNickname } from "../../../services/users";

const NicknameSection = () => {
  const { user, setUser } = useAuth(); // 전역 상태 업데이트용
  const [nickname, setNickname] = useState(user?.nickname || ""); // 초기값 안전하게 할당
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdate = async () => {
    if (!nickname.trim()) return;
    
    setIsLoading(true);
    try {
      // nickname 서비스 함수 호출
      await updateNickname(nickname);
      
      setUser({ ...user, nickname: nickname });
      alert("닉네임이 변경되었습니다.");
    } catch (error) {
      console.error("업데이트 실패", error);
      alert("변경에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">닉네임 설정</h2>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border p-2 rounded flex-1"
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



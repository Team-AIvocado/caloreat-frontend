import { useState } from "react";
import { updatePassword } from "../../../services/users";
import { useAlert } from "../../../context/AlertContext";

const PasswordSection = () => {
  // 입력 상태 관리
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    // 1. 빈 값 검사
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      showAlert({
        msg: "새 비밀번호를 작성해주세요.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
      return;
    }
    // 2. 현재 비밀번호와 동일한지 검사
    if (passwords.current === passwords.new) {
      showAlert({
        msg: "현재 비밀번호와 다른 비밀번호를 입력해주세요.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
      return;
    }
    // 3. 비밀번호 일치 검사
    if (passwords.new !== passwords.confirm) {
      showAlert({
        msg: "새 비밀번호가 일치하지 않습니다.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
      return;
    }
    // 4. 길이 검사
    if (passwords.new.length < 4) {
      showAlert({
        msg: "비밀 번호는 5자 이상이어야 합니다.",
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
      // API 호출
      await updatePassword(passwords.current, passwords.new);
      showAlert({
        msg: "비밀번호가 성공적으로 변경되었습니다.",
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
      // 입력창 초기화
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      console.error("비밀번호 변경을 실패했습니다.", error);
      // 에러 메세지 표시
      let msg = error.response?.data?.detail || "비밀번호 변경에 실패했습니다.";
      // 기본 비밀번호 에러 메세지 표시
      if (msg === "old pw incorrect") {
        msg = "현재 비밀번호가 일치하지 않습니다.";
      }

      showAlert({
        msg: msg,
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
      <h2 className="text-xl font-bold mb-4 text-primary_text">
        비밀번호 변경
      </h2>

      <div className="space-y-4">
        {/* 현재 비밀번호 */}
        <div>
          <label className="block text-sm font-medium text-primary_text mb-1">
            현재 비밀번호
          </label>
          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="현재 비밀번호를 입력하세요"
          />
        </div>
        {/* 새 비밀번호 */}
        <div>
          <label className="block text-sm font-medium text-primary_text mb-1">
            새 비밀번호
          </label>
          <input
            type="password"
            name="new"
            value={passwords.new}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="새 비밀번호 (4자 이상)"
          />
        </div>
        {/* 새 비밀번호 확인 */}
        <div>
          <label className="block text-sm font-medium text-primary_text mb-1">
            새 비밀번호 확인
          </label>
          <input
            type="password"
            name="confirm"
            value={passwords.confirm}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="새 비밀번호를 다시 입력하세요"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "변경 중..." : "비밀번호 변경"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PasswordSection;

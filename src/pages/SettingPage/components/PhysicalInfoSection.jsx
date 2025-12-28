import React, { useState, useEffect } from "react";
import { updatePhysicalInfo } from "../../../services/users";

export const PhysicalInfoSection = ({ initialData }) => {
  /* 키, 몸무게 입력 값 */
  const [height, setHeight] = useState(initialData?.height || "");
  const [weight, setWeight] = useState(initialData?.weight || "");
  /* 신체 정보 수정결과 메세지 */
  const [message, setMessage] = useState("");

  /* initialDate 변경 시 state 동기화 */
  useEffect(() => {
    if (initialData) {
      setHeight(initialData.height);
      setWeight(initialData.weight);
    }
  }, [initialData]);

  /* 정보 수정" 버튼 클릭 시 실행 */
  const handleUpdate = async () => {
    try {
      await updatePhysicalInfo(
        height,
        weight,
        initialData.gender,
        initialData.birthdate
      );
      setMessage("신체 정보가 업데이트되었습니다.");
    } catch (error) {
      setMessage("신체 정보 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg mb-4 border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">신체 정보</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            키 (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            몸무게 (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main_color"
          />
        </div>
      </div>
      <button
        onClick={handleUpdate}
        className="w-full py-2 bg-main_color text-white rounded-md hover:bg-main_color_hover transition-colors font-bold"
      >
        정보 수정
      </button>
      {message && (
        <p className="text-sm text-blue-600 mt-2 text-center animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
};

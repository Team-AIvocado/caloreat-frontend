import { useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import { ModifyInput } from "./ModifyInput";
import { fetchFood } from "../../../services/meal";
import { TailSpin } from "react-loader-spinner";

export const ImageAnalysis = ({
  imgSrc,
  setAnalysisMode,
  foodInfe,
  setResultMode,
  setFoodDetail,
}) => {
  // foodname에 . 들어있으면 제거하도록
  const [foodText, setFoodText] = useState(
    foodInfe.food_name.replace(/\./g, "")
  );
  const [foodCandi, setFoodCandi] = useState(
    foodInfe.candidates.map((c) => ({
      ...c,
      label: c.label.replace(/\./g, ""),
    }))
  );
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const { showAlert, closeAlert } = useAlert();

  const [additionalFoods, setAdditionalFoods] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 영양소 분석 요청 처리 함수
  const onResult = async () => {
    setLoading(true);
    try {
      // 1. 이미지 인식된 메인 음식 아이템 생성
      const mainItem = {
        image_id: foodInfe.image_id,
        foodname: foodText,
      };

      // 2. 텍스트로 직접 추가된 음식 아이템 생성 (UUID-index 형식의 image_id 부여)
      const manualItems = additionalFoods.map((food, index) => ({
        image_id: `${foodInfe.image_id}-${index + 1}`,
        foodname: food,
      }));

      const payload = [mainItem, ...manualItems];

      const res = await fetchFood(payload);
      if (res && res.results && res.results.length > 0) {
        setResultMode(true);
        // Pass the entire response object because ImageResult expects foodDetail.results
        setFoodDetail(res);
      }
    } catch (e) {
      console.error("failed to fetch food res", e);
    } finally {
      setLoading(false);
    }
  };

  // 후보군 음식 선택 시 처리 함수
  const handleCandidateSelect = (index) => {
    setSelected(index);
    setFoodText(foodCandi[index].label.replace(/\./g, ""));
  };

  // 텍스트 직접 수정 시 처리 함수
  const handleManualUpdate = (input) => {
    const cleanInput = input.replace(/\./g, "");
    const UserInput = {
      label: cleanInput,
      confidence: 1.0,
    };

    // 기존 후보군에 사용자 입력 추가 및 중복 제거
    const updatedCandidates = [
      UserInput,
      ...foodCandi.filter((c) => c.label !== cleanInput),
    ];

    setFoodCandi(updatedCandidates);
    setFoodText(cleanInput);
    setSelected(0);

    closeAlert();
  };

  // 선택되지 않은 후보군 버튼 생성을 위한 필터링
  const candidateButtons = foodCandi.filter((_, index) => index !== selected);

  const handleAddFood = () => {
    let tempFoodName = "";
    showAlert({
      msg: "추가할 음식명을 입력해주세요",
      hasNavbar: true,
      footer: (
        <div className="flex flex-col items-center w-full">
          <input
            type="text"
            className="w-5/6 bg-white rounded-lg mb-4 px-3 py-2 border border-border_color focus:outline-none"
            placeholder="음식명 입력"
            onChange={(e) => (tempFoodName = e.target.value)}
          />
          <div className="flex gap-3">
            <button
              className="bg-main_color text-white rounded-lg px-6 py-2 text-sm"
              onClick={() => {
                if (tempFoodName.trim()) {
                  setAdditionalFoods((prev) => [...prev, tempFoodName.trim()]);
                  setIsCollapsed(true);
                  closeAlert();
                }
              }}
            >
              추가
            </button>
            <button
              className="bg-gray-200 text-secondary_text rounded-lg px-6 py-2 text-sm"
              onClick={closeAlert}
            >
              취소
            </button>
          </div>
        </div>
      ),
    });
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white/80 z-100 flex flex-col items-center justify-center">
          <TailSpin color="#27d0c3" height={80} width={80} />
          <p className="mt-4 text-secondary_text font-bold text-lg">
            영양소 분석중입니다..
          </p>
        </div>
      )}
      <div className="flex flex-col items-center w-full px-4">
        <div className="flex items-center justify-between w-full max-w-[600px] pb-2 mt-4">
          <div className="font-bold text-primary_text">음식 인식 완료!</div>
        </div>

        <div className="w-full max-w-[600px] rounded-lg bg-white border-4 border-sub_background relative">
          {isCollapsed ? (
            <div className="flex px-4 py-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  className="w-16 h-16 rounded-lg border border-border_color object-cover"
                  src={imgSrc}
                  alt="food"
                />
                <div className="text-xl font-bold text-primary_text">
                  {foodText}
                </div>
              </div>
              <button
                className="text-sm text-secondary_text underline"
                onClick={() => setIsCollapsed(false)}
              >
                수정하기
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row px-4 py-5 items-center md:items-start">
              <img
                className="w-40 md:w-52 aspect-square rounded-lg border-2 border-border_color object-cover object-center"
                src={imgSrc}
                draggable="false"
              />
              <div className="flex flex-col w-full pt-2 pl-4">
                <div className="text-3xl mt-3 text-primary_text mb-4">
                  {foodText}
                </div>

                <div className="text-secondary_text mb-4">
                  <div className="flex flex-wrap gap-2">
                    {candidateButtons.map((candidate) => (
                      <button
                        key={candidate.label}
                        className="px-4 py-2 rounded-full border border-main_color text-main_color text-sm font-medium "
                        onClick={() => {
                          const index = foodCandi.findIndex(
                            (item) => item.label === candidate.label
                          );
                          handleCandidateSelect(index);
                        }}
                      >
                        {candidate.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex gap-4">
                    <button
                      className="underline text-xs text-gray-500 hover:text-main_color"
                      onClick={() => setAnalysisMode(false)}
                    >
                      사진 재촬영
                    </button>
                    <button
                      className="underline text-xs text-gray-500 hover:text-main_color"
                      onClick={() => {
                        showAlert({
                          msg: "음식명을 수정해주세요",
                          hasNavbar: true,
                          footer: (
                            <ModifyInput
                              initialFoodText={foodText}
                              setFoodText={handleManualUpdate}
                              closeAlert={closeAlert}
                            />
                          ),
                        });
                      }}
                    >
                      텍스트 직접 수정
                    </button>
                  </div>
                </div>
              </div>
              {additionalFoods.length > 0 && (
                <button
                  className="absolute bottom-2 right-2 text-xs text-secondary_text bg-gray-100 px-2 py-1 rounded"
                  onClick={() => setIsCollapsed(true)}
                >
                  닫기
                </button>
              )}
            </div>
          )}
        </div>

        <div className="w-full max-w-[600px] mt-4 space-y-2">
          {additionalFoods.map((food, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white border-4 border-sub_background rounded-lg px-4 py-3"
            >
              <div className="text-lg font-medium text-primary_text">
                {food}
              </div>
              <button
                className="text-secondary_text font-bold"
                onClick={() =>
                  setAdditionalFoods((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            className="w-12 h-12 rounded-full bg-main_color flex items-center justify-center text-white text-3xl font-bold shadow-none"
            onClick={handleAddFood}
          >
            +
          </button>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-main_color text-white rounded-lg px-12 py-3 font-bold cursor-pointer disabled:bg-gray-400"
            onClick={onResult}
            disabled={loading}
          >
            영양소 분석하기
          </button>
        </div>
      </div>
    </>
  );
};

import { useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import { ModifyInput } from "./ModifyInput";
import { foodAnalyzeSingle } from "../../../services/meal";

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

  const onResult = async () => {
    setLoading(true);
    try {
      const res = await foodAnalyzeSingle(foodText);
      if (res) {
        setResultMode(true);
        setFoodDetail(res);
      }
    } catch (e) {
      console.error("failed to fetch food res", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCandidateSelect = (index) => {
    setSelected(index);
    setFoodText(foodCandi[index].label.replace(/\./g, ""));
  };

  const handleManualUpdate = (input) => {
    const cleanInput = input.replace(/\./g, "");
    const UserInput = {
      label: cleanInput,
      confidence: 1.0,
    };

    const updatedCandidates = [
      UserInput,
      ...foodCandi.filter(
        //이미 존재하는 라벨 방지
        (c) => c.label !== cleanInput
      ),
    ];

    setFoodCandi(updatedCandidates);
    setFoodText(cleanInput);
    setSelected(0);

    closeAlert();
  };

  // 선택되지 않은 후보군 버튼 생성을 위한 필터링
  const candidateButtons = foodCandi.filter((_, index) => index !== selected);

  //TODO: 음식 추가 버튼 및 기능
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[600px] flex justify-start mb-4">
          <button
            onClick={() => setAnalysisMode(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        <div className="text-left w-full max-w-[600px] pl-4 pb-2">
          음식 인식 완료!
        </div>
        <div className="w-[90vw] max-w-[600px] rounded-lg bg-white border-4 border-sub_background">
          <div className="flex flex-col md:flex-row px-5 py-9 items-center md:items-start">
            {" "}
            <img
              className="w-2/3 md:w-2/4 aspect-square rounded-lg border-2 border-border_color object-cover object-center"
              src={imgSrc}
              draggable="false"
            />
            <div className="flex flex-col w-full pt-7 pl-4">
              <div className="h-1/4 text-2xl text-primary_text pl-6">
                {foodCandi[selected].label}{" "}
              </div>

              <div className="h-1/4 text text-secondary_text pl-4 mb-10 pt-5">
                {/* 후보가 없는경우 대비 */}
                {candidateButtons.length > 0 && (
                  <div className=" text pb-3">
                    만약 아니면 혹시 이런 음식인가요?
                  </div>
                )}

                <div className="pl-4 text text-secondary_text">
                  {candidateButtons.map((candidate) => (
                    <button
                      key={candidate.label}
                      className="mr-2 underline text"
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

              <div className="h-1/4 pl-4">
                <div className="mb-2 mr-4 text-sm text-secondary_text">
                  그래도 아니라면?
                </div>
                <button
                  className="underline pl-4 text-sm text-gray-500 mr-5"
                  onClick={() => {
                    setAnalysisMode(false);
                  }}
                >
                  사진 재촬영
                </button>
                <button
                  className="underline text-sm text-gray-500 mr-2"
                  onClick={() => {
                    showAlert({
                      msg: "음식명을 수정해주세요",
                      hasNavbar: true,
                      footer: (
                        <ModifyInput
                          initialFoodText={foodCandi[selected].label}
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
        </div>
        <div className="flex justify-center">
          <button
            className=" bg-main_color text-white rounded-lg px-8 py-2 mt-5 text-sm cursor-pointer disabled:bg-gray-400"
            onClick={onResult}
            disabled={loading}
          >
            {loading ? "분석 중..." : "영양소 분석하기"}
          </button>
        </div>
      </div>
    </>
  );
};

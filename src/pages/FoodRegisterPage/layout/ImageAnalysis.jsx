import { useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import { ModifyInput } from "./ModifyInput";
import { fetchFood } from "../../../services/meal";

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
      const res = await fetchFood(foodText);
      if (res) {
        setResultMode(true);
        setFoodDetail(res);
      }
    } catch {
      console.log("failed to fetch food res");
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

  //selected 되지 않은 후보군(2개) 버튼생성을 위한 배열
  const candidateButtons = foodCandi.filter((_, index) => index !== selected);

  //TODO: 음식 추가 버튼 및 기능
  return (
    <>
      <div className="text-left underline pl-4 pb-2">음식 인식 완료!</div>
      <div className="w-[90vw] max-w-[600px] rounded-lg bg-white border-4 border-sub_border">
        <div className="flex flex-col md:flex-row px-5 py-9 items-center md:items-start">
          {" "}
          <img
            className="w-2/3 md:w-2/4 aspect-square rounded-lg border-2 border-border_color object-cover object-center"
            src={imgSrc}
            draggable="false"
          />
          <div className="flex flex-col w-full pt-8 pl-4">
            <div className="h-1/4 text-2xl text-primary_text pl-6">
              {foodCandi[selected].label}{" "}
            </div>

            <div className="h-1/4 text-sm text-secondary_text pl-4 mb-10 mt-9">
              {/* 후보가 없는경우 대비 */}
              {candidateButtons.length > 0 && (
                <div className="mb-4 text-[1.3em]">
                  만약 아니면 혹시 이런 음식인가요?
                </div>
              )}

              <div className="h-1/4 text-xs text-secondary_text">
                {candidateButtons.map((candidate) => (
                  <button
                    key={candidate.label}
                    className="mr-2 underline text-[1.6em]"
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
              <div className="mb-2 mr-4 text-xs">그래도 아니라면?</div>
              <button
                className="underline text-sm text-gray-500 mr-5"
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
          className=" bg-main_color w-2/3 text-white rounded-lg px-8 py-2 mt-5 text-sm cursor-pointer disabled:bg-gray-400"
          onClick={onResult}
          disabled={loading}
        >
          {loading ? "분석 중..." : "영양소 분석하기"}
        </button>
      </div>
    </>
  );
};

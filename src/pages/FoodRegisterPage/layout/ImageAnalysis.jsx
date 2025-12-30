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

  // Helper for generating UUIDs for manual items
  // eslint-disable-next-line no-unused-vars
  const generateUUID = () => {
    return self.crypto.randomUUID();
  };

  const onResult = async () => {
    setLoading(true);
    try {
      // 1. Construct Main Item (Image Detected)
      const mainItem = {
        image_id: foodInfe.image_id,
        foodname: foodText,
      };

      // TODO: Combine with manual items here (use generateUUID for them)
      // const manualItems = sideDishes.map(d => ({ image_id: generateUUID(), foodname: d.name }));

      const payload = [mainItem];

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
        <div className="text-left w-full max-w-[600px] pl-4 pb-2 mt-4">
          음식 인식 완료!
        </div>
        <div className="w-[90vw] max-w-[600px] rounded-lg bg-white border-4 border-sub_background">
          <div className="flex flex-col md:flex-row px-4 py-5 items-center md:items-start">
            {" "}
            <img
              className="w-32 md:w-40 aspect-square rounded-lg border-2 border-border_color object-cover object-center"
              src={imgSrc}
              draggable="false"
            />
            <div className="flex flex-col w-full pt-2 pl-4">
              <div className="text-2xl text-primary_text pl-6 mb-2">
                {foodCandi[selected].label}{" "}
              </div>

              <div className="text text-secondary_text pl-4 mb-4">
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

              <div className="pl-4 mt-2">
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

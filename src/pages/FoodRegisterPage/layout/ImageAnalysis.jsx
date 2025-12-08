import { useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import { ModifyInput } from "./modifyInput";
import { useNavigate } from "react-router-dom";

export const ImageAnalysis = ({ imgSrc, setAnalysisMode, foodInfe }) => {
  const [foodText, setFoodText] = useState(foodInfe.food_name);
  const [foodCandi, setFoodCandi] = useState(foodInfe.candidates);
  const [selected, setSelected] = useState(0);
  const { showAlert, closeAlert } = useAlert();
  const navigate = useNavigate();

  const onResult = () => {
    navigate("/main/result");
  };

  const handleCandidateSelect = (index) => {
    setSelected(index);
    setFoodText(foodCandi[index].label);
  };

  const handleManualUpdate = (input) => {
    const UserInput = {
      label: input,
      confidence: 1.0,
    };

    const updatedCandidates = [
      UserInput,
      ...foodCandi.filter(
        //이미 존재하는 라벨 방지
        (c) => c.label !== input
      ),
    ];

    setFoodCandi(updatedCandidates);
    setFoodText(input);
    setSelected(0);

    closeAlert();
  };

  //selected 되지 않은 후보군(2개) 버튼생성을 위한 배열
  const candidateButtons = foodCandi.filter((_, index) => index !== selected);

  return (
    <>
      <div className="text-left underline pl-4 pb-2">음식 인식 완료!</div>
      <div className="w-[600px] rounded-xl bg-white border-4 border-sub_border">
        <div className="flex flex-row px-5 py-9">
          {" "}
          <img
            className="w-2/4 aspect-square rounded-lg border-2 border-border_color object-cover object-center"
            src={imgSrc}
          />
          <div className="flex flex-col w-full pt-8 pl-4">
            <div className="h-1/4 text-2xl text-primary_text pl-6">
              {foodCandi[selected].label}{" "}
            </div>
            <div className=" h-1/4 text-end pr-20 text-third_text">
              정확도 {Math.round(foodCandi[selected].confidence * 100)} %
            </div>

            <div className="h-1/4 text-sm text-secondary_text pl-4 mb-10 mt-9">
              {/* 후보가 없는경우 대비 */}
              {candidateButtons.length > 0 && (
                <div className="mb-4">만약 아니면 혹시 이런 음식인가요?</div>
              )}

              <div className="h-1/4 text-xs text-secondary_text">
                {candidateButtons.map((candidate) => (
                  <button
                    key={candidate.label}
                    className="mr-1.5 underline"
                    onClick={() => {
                      const index = foodCandi.findIndex(
                        (item) => item.label === candidate.label
                      );
                      handleCandidateSelect(index);
                    }}
                  >
                    {candidate.label}{" "}
                    <span className=" text-third_text">
                      ({Math.round(candidate.confidence * 100)} %)
                    </span>
                  </button>
                ))}
                ...중 선택
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
          className=" bg-main_color w-2/3 text-white rounded-lg px-8 py-2 mt-5 text-sm cursor-pointer "
          onClick={onResult}
        >
          분석결과 보기
        </button>
      </div>
    </>
  );
};

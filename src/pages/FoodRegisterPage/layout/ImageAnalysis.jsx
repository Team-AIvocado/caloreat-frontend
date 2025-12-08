import { useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import { backBtn } from "../../../utils/styles";
import { ModifyInput } from "./modifyInput";

export const ImageAnalysis = ({ imgSrc, setAnalysisMode }) => {
  const [foodText, setFoodText] = useState("foodName");
  const { showAlert, closeAlert } = useAlert();
  const [userInput, setUserInput] = useState("");

  return (
    <>
      <div className="text-left underline pl-4 pb-2">음식 인식 완료!</div>
      <div className="w-[600px] rounded-xl bg-white border-4 border-sub_border">
        <div className="flex flex-row px-5 py-9">
          {" "}
          <img
            className="w-2/4 aspect-square rounded-lg border-2 border-border_color"
            src={imgSrc}
          />
          <div className="flex flex-col w-2/3 pt-8 pl-4">
            <div className="h-1/4 text-2xl text-primary_text pl-6">
              {foodText}
            </div>
            <div className=" h-1/4 text-end pr-20 text-third_text">(accu%)</div>
            {/* 다른 음식 후보들 존재하면 2개정도 버튼 생성 */}
            <div className="h-3/4"></div>
            <div className="h-1/4 text-end">
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
                        userInput={userInput}
                        setUserInput={setUserInput}
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
      <div className="flex justify-center"></div>
    </>
  );
};

import { useState } from "react";
import { useAlert } from "../../context/AlertContext";
import { ImageInput } from "./layout/ImageInput";
import { ImageAnalysis } from "./layout/ImageAnalysis";
import { ImageResult } from "./layout/ImageResult";
import { useNavigate } from "react-router-dom";

export const FoodRegisterPage = () => {
  const { showAlert, closeAlert } = useAlert();
  const [cameraMode, setCameraMode] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [analysisMode, setAnalysisMode] = useState(false);
  const [foodInfe, setFoodInfe] = useState("");
  const [resultMode, setResultMode] = useState(false);
  const [foodDetail, setFoodDetail] = useState("");
  const navigate = useNavigate();

  const resetAll = () => {
    showAlert({
      msg: "정말로 그만두시겠습니까?",
      footer: (
        <div className="flex justify-center gap-3">
          <button
            className="bg-sub_background rounded-lg text-sm px-6 py-2 border border-secondary_text text-primary_text cursor-pointer"
            onClick={closeAlert}
          >
            아니요
          </button>
          <button
            className="bg-error_color rounded-lg text-sm px-6 py-2 border-none text-white cursor-pointer"
            onClick={() => {
              setCameraMode(false);
              setImgSrc("");
              setAnalysisMode(false);
              setFoodInfe("");
              setResultMode(false);
              setFoodDetail("");
              closeAlert();
              navigate("/main/dashboard");
            }}
          >
            네
          </button>
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col justify-start items-center relative h-[calc(100dvh-10rem)] md:h-screen overflow-hidden">
      <button
        className="absolute top-5 left-5 text-gray-600 hover:text-gray-900 z-10"
        onClick={() => {
          if (resultMode) {
            setResultMode(false);
          } else if (analysisMode) {
            setAnalysisMode(false);
          } else {
            navigate("/main/dashboard");
          }
        }}
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

      <button
        className="absolute top-5 right-5 text-xs text-secondary_text underline cursor-pointer z-10"
        onClick={resetAll}
      >
        기록 그만두기
      </button>
      <div className="pt-10 pb-4 text-center text-2xl text-secondary_text shrink-0">
        음식 기록하기
      </div>
      <div className="flex flex-col justify-start w-full flex-1 overflow-y-auto pb-2">
        {resultMode ? (
          <ImageResult
            imgSrc={imgSrc}
            foodDetail={foodDetail}
            imageId={foodInfe?.image_id}
          />
        ) : (
          <>
            {analysisMode ? (
              <ImageAnalysis
                imgSrc={imgSrc}
                setAnalysisMode={setAnalysisMode}
                foodInfe={foodInfe}
                setResultMode={setResultMode}
                setFoodDetail={setFoodDetail}
              />
            ) : (
              <ImageInput
                showAlert={showAlert}
                closeAlert={closeAlert}
                setCameraMode={setCameraMode}
                setImgSrc={setImgSrc}
                cameraMode={cameraMode}
                imgSrc={imgSrc}
                setAnalysisMode={setAnalysisMode}
                setFoodInfe={setFoodInfe}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

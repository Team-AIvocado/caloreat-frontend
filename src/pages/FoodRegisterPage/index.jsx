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
    setCameraMode(false);
    setImgSrc("");
    setAnalysisMode(false);
    setFoodInfe("");
    setResultMode(false);
    setFoodDetail("");
    navigate("/main/dashboard");
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      <button
        className="absolute top-5 right-5 text-xs text-secondary_text dark:text-gray-400 underline cursor-pointer"
        onClick={resetAll}
      >
        기록 그만두기
      </button>
      <div className="mt-20 pb-7 text-center text-2xl text-primary_text font-bold">
        음식 기록하기
      </div>
      <div className="flex flex-col justify-center">
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

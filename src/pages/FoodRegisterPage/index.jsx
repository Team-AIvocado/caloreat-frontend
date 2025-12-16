import { useState } from "react";
import { useAlert } from "../../context/AlertContext";
import { ImageInput } from "./layout/ImageInput";
import { ImageAnalysis } from "./layout/ImageAnalysis";
import { ImageResult } from "./layout/ImageResult";

export const FoodRegisterPage = () => {
  const { showAlert, closeAlert } = useAlert();
  const [cameraMode, setCameraMode] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [analysisMode, setAnalysisMode] = useState(false);
  const [foodInfe, setFoodInfe] = useState("");
  const [resultMode, setResultMode] = useState(false);
  const [foodDetail, setFoodDetail] = useState("");

  return (
    <div className="flex flex-col justify-center items-center">
      {resultMode ? (
        <ImageResult
          imgSrc={imgSrc}
          foodDetail={foodDetail}
          imageId={foodInfe?.image_id}
        />
      ) : (
        <>
          <div className="pt-24 pb-11 text-center text-2xl text-secondary_text">
            음식 기록하기
          </div>
          <div className="flex flex-col justify-center">
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
          </div>
        </>
      )}
    </div>
  );
};

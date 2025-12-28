import { useState } from "react";
import { useAlert } from "../../context/AlertContext";
import { ImageInput } from "./layout/ImageInput";
import { ImageAnalysis } from "./layout/ImageAnalysis";
import { ImageResult } from "./layout/ImageResult";
import { useNavigate } from "react-router-dom";
import { alertBtn } from "../../utils/styles";

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
        <div className="flex space-x-4">
          <button
            className={alertBtn}
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
          <button className={alertBtn} onClick={closeAlert}>
            아니요
          </button>
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      <button
        className="absolute top-5 right-5 text-xs text-secondary_text underline cursor-pointer"
        onClick={resetAll}
      >
        기록 그만두기
      </button>
      <div className="mt-10 pb-7 text-center text-2xl text-secondary_text">
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

import { useState } from "react";
import { WebCamera } from "../../components/WebCamera";

export const FoodRegisterPage = () => {
  const [cameraMode, setCameraMode] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="pt-24 pb-11 text-center text-2xl text-secondary_text">
        음식 기록하기
      </div>
      <div className="flex flex-col justify-center items-center">
        <div
          className="text-start underline pl-4 pb-2 cursor-pointer"
          onClick={() => {
            setCameraMode(true);
            setImgSrc("");
          }}
        >
          {cameraMode || <>{imgSrc ? "사진 다시 등록하기" : "사진 등록하기"}</>}
        </div>
        <div className="w-[500px] aspect-square rounded-lg bg-sub_background border border-border_color">
          {imgSrc ? (
            <img src={imgSrc} />
          ) : (
            <>
              {cameraMode ? (
                <WebCamera
                  setImgSrc={setImgSrc}
                  setCameraMode={setCameraMode}
                />
              ) : (
                <div className="text-center text-secondary_text w-full h-full flex justify-center items-center">
                  음식을 등록해주세요
                </div>
              )}
            </>
          )}
        </div>
        {imgSrc && (
          <button className="flex bg-main_color w-2/3 text-white rounded-lg px-8 py-2 mt-5 text-sm cursor-pointer">
            사진 분석하기
          </button>
        )}
      </div>
    </div>
  );
};

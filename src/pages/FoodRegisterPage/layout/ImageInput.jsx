import { useRef, useState } from "react";
import { alertBtn, backBtn } from "../../../utils/styles";
import { WebCamera } from "../../../components/WebCamera/index";
import { foodDetect } from "../../../services/meal";
import { TailSpin } from "react-loader-spinner";

export const ImageInput = ({
  showAlert,
  closeAlert,
  setCameraMode,
  setImgSrc,
  cameraMode,
  imgSrc,
  setAnalysisMode,
  setFoodInfe,
}) => {
  const fileRef = useRef();

  const [loading, setLoading] = useState(false);

  //image file preview 가능하도록 encoding
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        resolve();
      };
    });
  };

  const addImage = async (e) => {
    if (e.target.files[0]) {
      await encodeFileToBase64(e.target.files[0]);
    }
    closeAlert();
  };

  //input file image upload btn 대신 누르기
  const onImage = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  const onAnalysis = async () => {
    setLoading(true);
    try {
      const res = await foodDetect(imgSrc);
      if (res) {
        setFoodInfe(res);
        setAnalysisMode(true);
      }
    } catch {
      setAnalysisMode(false);
      console.log("failed to fetch food res");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white/80 z-100 flex flex-col items-center justify-center">
          <TailSpin color="#27d0c3" height={80} width={80} />
          <p className="mt-4 text-secondary_text font-semibold text-lg">
            음식 분석중입니다..
          </p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        {imgSrc && (
          <div className="text-secondary_text pb-2 cursor-pointer">
            <span className="text-sm">
              재촬영을 원하신다면 이미지를 클릭하여 진행해주세요
            </span>
          </div>
        )}
        <div
          className="w-[90vw] max-w-[500px] aspect-square rounded-lg bg-white border-2 border-sub_background flex flex-col items-center justify-center relative cursor-pointer"
          onClick={() => {
            if (!cameraMode) {
              showAlert({
                msg: "음식 사진을 등록해주세요",
                hasNavbar: true,
                footer: (
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-center space-x-4">
                      <input
                        className="hidden"
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={addImage}
                      />
                      <button className={alertBtn} onClick={onImage}>
                        파일에서 선택
                      </button>
                      <button
                        className={alertBtn}
                        onClick={() => {
                          setCameraMode(true);
                          setImgSrc("");
                          closeAlert();
                        }}
                      >
                        카메라 열기
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <button className={backBtn} onClick={closeAlert}>
                        닫기
                      </button>
                    </div>
                  </div>
                ),
              });
            }
          }}
        >
          {cameraMode ? (
            <>
              <button
                className="absolute top-4 left-4 z-50 bg-white/80 rounded-lg px-3 py-1 text-xs font-semibold text-primary_text border border-border_color"
                onClick={(e) => {
                  e.stopPropagation();
                  setCameraMode(false);
                }}
              >
                이전
              </button>
              <WebCamera setImgSrc={setImgSrc} setCameraMode={setCameraMode} />
            </>
          ) : (
            <>
              {imgSrc ? (
                <img
                  className="w-full h-full object-cover object-center"
                  src={imgSrc}
                  draggable="false"
                />
              ) : (
                <div className="text-secondary_text text-lg font-medium text-center">
                  여기를 눌러 음식을 등록해주세요
                </div>
              )}
            </>
          )}
        </div>

        {imgSrc && !cameraMode && (
          <div className="flex flex-col items-center mt-5 space-y-4 w-full">
            <button
              className="bg-main_color w-2/3 text-white rounded-lg px-3 py-2  disabled:bg-gray-300"
              onClick={onAnalysis}
              disabled={loading}
            >
              {loading ? "분석 중..." : "음식 분석하기"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

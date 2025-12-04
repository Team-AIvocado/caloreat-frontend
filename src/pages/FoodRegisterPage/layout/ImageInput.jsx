import { useRef } from "react";
import { alertBtn, backBtn } from "../../../utils/styles";
import { WebCamera } from "../../../components/WebCamera/index";

export const ImageInput = ({
  showAlert,
  closeAlert,
  setCameraMode,
  setImgSrc,
  cameraMode,
  imgSrc,
  setAnalysisMode,
}) => {
  const fileRef = useRef();

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

  return (
    <>
      <div
        className="text-left underline pl-4 pb-2 cursor-pointer"
        onClick={() => {
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
        }}
      >
        {cameraMode || <> {imgSrc ? "사진 다시 등록하기" : "사진 등록하기"}</>}
      </div>
      <div className="w-[500px] aspect-square rounded-lg bg-sub_background border border-border_color">
        {imgSrc ? (
          <img
            className="w-[500px] h-[500px] object-cover object-center"
            src={imgSrc}
          />
        ) : (
          <>
            {cameraMode ? (
              <WebCamera setImgSrc={setImgSrc} setCameraMode={setCameraMode} />
            ) : (
              <div className="text-center text-secondary_text w-full h-full flex justify-center items-center">
                음식을 등록해주세요
              </div>
            )}
          </>
        )}
      </div>
      {imgSrc && (
        <div className="flex justify-center">
          <button
            className=" bg-main_color w-2/3 text-white rounded-lg px-8 py-2 mt-5 text-sm cursor-pointer "
            onClick={() => setAnalysisMode(true)}
          >
            사진 분석하기
          </button>
        </div>
      )}
    </>
  );
};

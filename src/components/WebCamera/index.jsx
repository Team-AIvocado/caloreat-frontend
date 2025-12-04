import React from "react";
import Webcam from "react-webcam";
import camera from "../../assets/camera.png";
import { useAlert } from "../../context/AlertContext";
import { alertBtn } from "../../utils/styles";

const videoConstraints = {
  width: 500,
  height: 500,
  facingMode: "user",
};

export const WebCamera = ({ setImgSrc, setCameraMode }) => {
  const webcamRef = React.useRef(null);
  const { showAlert, closeAlert } = useAlert();

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      showAlert({
        msg: "사진 촬영 완료!!",
        hasNavbar: true,
        footer: (
          <button className={alertBtn} onClick={closeAlert}>
            확인
          </button>
        ),
      });
      setCameraMode(false);
    }
  };
  return (
    <div className="relative w-full h-full">
      <Webcam
        audio={false}
        height={500}
        screenshotFormat="image/jpeg"
        width={500}
        videoConstraints={videoConstraints}
        className="w-full h-full absolute inset-0 object-cover"
        ref={webcamRef}
      />

      <button
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                   w-16 h-16 rounded-full border-2 border-black bg-white/30
                   flex justify-center items-center z-20 text-white"
        onClick={capture}
      >
        <img className="w-10 aspect-square" src={camera} />
      </button>
    </div>
  );
};

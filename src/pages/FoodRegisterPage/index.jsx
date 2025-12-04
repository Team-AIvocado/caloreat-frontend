import { useState } from "react";
import { useAlert } from "../../context/AlertContext";
import { ImageInput } from "./layout/ImageInput";

export const FoodRegisterPage = () => {
  const { showAlert, closeAlert } = useAlert();
  const [cameraMode, setCameraMode] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  return (
    <ImageInput
      showAlert={showAlert}
      closeAlert={closeAlert}
      setCameraMode={setCameraMode}
      setImgSrc={setImgSrc}
      cameraMode={cameraMode}
      imgSrc={imgSrc}
    />
  );
};

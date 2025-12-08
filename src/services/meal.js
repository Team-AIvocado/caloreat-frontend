import { api } from "../api/axios";

export const foodDetect = async () => {
  // try {
  //   const response = await api.post("/meals/upload");
  //        return {
  //         image_id: response.image_id,
  //         food_name: response.food_name,
  //         candidates: response.candidates,
  //       };
  // } catch (e) {
  //   console.log("failed to food detect ", e);
  // }
  return {
    image_id: "uuid",
    food_name: "된장찌개",
    candidates: [
      { label: "된장찌개", confidence: 0.93 },
      { label: "김치찌개", confidence: 0.72 },
      { label: "청국장", confidence: 0.65 },
    ],
  };
};

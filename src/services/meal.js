import { api } from "../api/axios";

export const foodDetect = async (imgSrc) => {
  // try {
  //   const response = await api.post("/meals/upload", imgSrc);
  //   return response.data;
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

export const fetchFood = async (foods) => {
  const data = { foodnames: [foods] };
  // try {
  //   const response = await api.post("/meals/analyze", data);
  //   return response.data;
  // } catch (e) {
  //   console.log("failed to fetch food details ", e);
  // }

  return {
    results: [
      {
        foodname: "된장찌개",
        calories: 230,
        carbs: 30,
        protein: 12,
        fat: 240,
        nutritions: {
          sugar: 40,
          fiber: 15,
          sodium: 12,
          cholesterol: 4,
          saturated_fat: 9,
        },
        micronutrients: { vitamin_c: 20, calcium: 50 },
      },
    ],
  };
};

export const getTotalKcal = async () => {
  try {
    const response = await api.get("/dashboard/today");
    return response.data;
  } catch (e) {
    console.log("failed to get day total kcal", e);
  }
};

import { api } from "../api/axios";

// Base64 to Blob converter
const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

export const foodDetect = async (imgSrc) => {
  const formData = new FormData();

  if (typeof imgSrc === "string" && imgSrc.startsWith("data:")) {
    const blob = dataURItoBlob(imgSrc);
    formData.append("file", blob, "image.jpg");
  } else {
    formData.append("file", imgSrc);
  }

  try {
    const response = await api.post("/meals/upload", formData, {
      headers: {
        "Content-Type": undefined,
      },
    });
    return response.data;
  } catch (e) {
    console.error("failed to food detect", e);
    throw e;
  }
};

export const fetchFood = async (foodName) => {
  const data = { foodname: foodName };

  try {
    const response = await api.post("/meals/analyze/single", data);
    const resultData = response.data;

    if (resultData && resultData.nutritions) {
      const nuts = resultData.nutritions;
      const transformedItem = {
        ...resultData,
        calories: nuts.calories,
        carbs: nuts.carbs_g,
        protein: nuts.protein_g,
        fat: nuts.fat_g,
        micronutrients: nuts.micronutrients,
        nutritions: nuts,
      };
      return { results: [transformedItem] };
    }

    return { results: [] };
  } catch (e) {
    console.error("failed to fetch food details", e);
    throw e;
  }
};

export const getTotalKcal = async () => {
  try {
    const response = await api.get("/dashboard/today");
    return response.data;
  } catch (e) {
    console.log("failed to get day total kcal", e);
  }
};

export const createMealLog = async (mealData) => {
  try {
    const response = await api.post("/meals/log", mealData);
    return response.data;
  } catch (e) {
    console.error("failed to create meal log", e);
    throw e;
  }
};

// Alias for backward compatibility
export const saveMealLog = createMealLog;

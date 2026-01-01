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

// items: [{image_id: string, foodname: string}]
export const fetchFood = async (items) => {
  const data = { foodnames: items };
  try {
    const response = await api.post("/meals/analyze", data);

    // Backend returns nested structure, flatten it for frontend
    if (response.data && response.data.results) {
      const transformedResults = response.data.results.map((item) => {
        const nuts = item.nutritions || {};
        return {
          ...item,
          calories: nuts.calories,
          carbs: nuts.carbs_g,
          protein: nuts.protein_g,
          fat: nuts.fat_g,
          sugar: nuts.sugar_g,
          sodium: nuts.sodium_mg,
          fiber: nuts.fiber_g,
          cholesterol: nuts.cholesterol_mg,
          saturated_fat: nuts.saturated_fat_g,
          micronutrients: nuts.micronutrients,
          // Keep original nutritions for other fields
          nutritions: nuts,
        };
      });
      return { results: transformedResults };
    }

    return response.data;
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

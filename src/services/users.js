import { api } from "../api/axios";

export const test = async () => {
  try {
    const response = await api.get("/");
    console.log(response);
  } catch (e) {
    console.log("failed to fetch data", e);
  }
};

export const login = async (account, password) => {
  const data = { account: account, password: password };
  try {
    const response = await api.post("/users/login", data);
    console.log("로그인 성공:", response.data);
    return response.data;
  } catch (e) {
    console.log("failed to fetch user data", e.response.data.detail);
    throw e;
  }
};

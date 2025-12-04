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
    // console.log("로그인 성공:", response.data);
    return response.data;
  } catch (e) {
    console.log("failed to fetch user data", e.response.data.detail);
    throw e;
  }
};

export const checkemail = async (email) => {
  try {
    const response = await api.get(`/users/checkemail?email=${email}`);
    console.log("이메일 중복 체크", response.data);
    return "사용가능한 이메일";
  } catch (e) {
    console.log("이미 존재하는 이메일", e.data.response.detail);
    throw e;
  }
};

export const checkid = async (id) => {
  try {
    const response = await api.get(`/users/checkid?id=${id}`);
    console.log("아이디 중복 체크", response.data);
    return "사용가능한 아이디";
  } catch (e) {
    console.log("이미 존재하는 아이디", e.data.response.detail);
    throw e;
  }
};

export const signUp = async (email, username, nickname, password) => {
  const data = {
    email: email,
    username: username,
    nickname: nickname,
    password: password,
  };

  try {
    const response = await api.post("/users/signup", data);
    console.log("sign up success", response.data);
    return response.data;
  } catch (e) {
    console.log("failed to sign up", e.response.data.detail);
    throw e;
  }
};

export const getUser = async () => {
  try {
    const response = await api.get("/users/me");
    console.log("success to get user", response.data);
    return response.data;
  } catch (e) {
    console.log("failed to get user", e.response.data.detail);
    throw e;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/users/logout");
    console.log("logout success", response.data);
    return response.data;
  } catch (e) {
    console.log("logout failure", e.response.data.detail);
    throw e;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await api.get("/users/me/profile/form");
    console.log("success to get user info", response.data);
    return response.data;
  } catch (e) {
    console.log("failed to get user info", e);
    throw e;
  }
};

export const createUserInfo = async (UserProfile, goal_type, conditions) => {
  const data = {
    gender: UserProfile.gender,
    birthdate: UserProfile.birthdate,
    height: UserProfile.height,
    weight: UserProfile.weight,
    goal_type: goal_type,
    conditions: conditions,
  };
  try {
    const response = await api.post("/users/me/profile/form", data);
    console.log("create comoplete", response.data);
  } catch (e) {
    console.log("failed to create userinfo", e);
  }
};

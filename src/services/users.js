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
    if (e.response && e.response.status === 409) {
      console.log("진짜 중복 이메일임");
      throw e;
    }
    console.log("이메일 체크 중 에러 발생 (중복 아닐 수 있음):", e);
    throw e;
  }
};

export const checkid = async (id) => {
  try {
    const response = await api.get(`/users/checkid?id=${id}`);
    console.log("아이디 중복 체크", response.data);
    return "사용가능한 아이디";
  } catch (e) {
    console.log("이미 존재하는 아이디", e.response?.data?.detail);
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

export const createUserInfo = async (userProfile, goal_type, conditions) => {
  const data = {
    gender: userProfile.gender,
    birthdate: userProfile.birthdate,
    height: parseFloat(userProfile.height),
    weight: parseFloat(userProfile.weight),
    goal_type: goal_type,
    conditions: conditions,
  };
  try {
    const response = await api.post("/users/me/profile/form", data);
    console.log("create complete", response.data);
    return response.data;
  } catch (e) {
    console.error("failed to create userinfo", e.response?.data || e.message);
    throw e;
  }
};

// 닉네임 변경 서비스 함수 추가
export const updateNickname = async (nickname) => {
  const data = {
    nickname: nickname
  };
  try {
    const response = await api.patch("/users/me", data);
    console.log("nickname update success", response.data);
    return response.data;
  } catch (e) {
    console.log("failed to update nickname", e.response?.data?.detail);
    throw e;
  }
};

// 비밀번호 변경 서비스 함수 추가
export const updatePassword = async (oldPassword, newPassword) => {
  const data = {
    old_password: oldPassword,
    new_password: newPassword,
  };
  try {
    const response = await api.patch("/users/me/password", data);
    console.log("password update success", response.data);
    return response.data;
  } catch (e) {
    console.log("failed to update password", e.response?.data?.detail);
    throw e;
  }
};

// 신체정보 수정 서비스 함수 추가
export const updatePhysicalInfo = async (height, weight) => {
  const data = {
    height: parseFloat(height),
    weight: parseFloat(weight),
  };
  try {
    const response = await api.patch("/users/me/profile/", data);
    console.log("physical info update success", response.data);
    return response.data;
  } catch (e) {
    console.log("failed to update physical info", e.response?.data?.detail);
    throw e;
  }
};

// 목표 수정 또는 입력 서비스 함수 추가
export const updateGoal = async (goalType) => {
  const data = {
    goal_type: goalType
  };
  try {
    const response = await api.patch("/users/me/profile/form", data);
    console.log("goal update success", response.data);
    return response.data;
  } catch (e) {
    console.log("failed to update goal", e.response?.data?.detail);
    throw e;
  }
};

// 질환 수정 또는 입력 서비스 함수 추가
export const updateConditions = async (conditions) => {
  const data = {
    conditions: conditions
  };
  try {
    const response = await api.patch("/users/me/profile/form", data);
    console.log("conditions update success", response.data);
    return response.data;
  } catch (e) {
    console.log("failed to update conditions", e.response?.data?.detail);
    throw e;
  }
};


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

export const updateNickname = async (nickname) => {
  const data = { nickname: nickname };
  try {
    const response = await api.patch("/users/me", data);
    console.log("update nickname success", response.data);
    return response.data;
  } catch (e) {
    console.error("failed to update nickname", e);
    throw e;
  }
};

export const updatePassword = async (currentPassword, newPassword) => {
  // Schema requires 'old_password', not 'current_password'
  const data = { old_password: currentPassword, new_password: newPassword };
  try {
    const response = await api.patch("/users/me/password", data);
    console.log("update password success", response.data);
    return response.data;
  } catch (e) {
    console.error("failed to update password", e);
    throw e;
  }
};

export const updatePhysicalInfo = async (height, weight, gender, birthdate) => {
  // Using PATCH /users/me/profile/form which accepts partial updates
  const data = {
    height: parseFloat(height),
    weight: parseFloat(weight)
  };
  try {
    const response = await api.patch("/users/me/profile/form", data);
    console.log("update physical info success", response.data);
    return response.data;
  } catch (e) {
    console.error("failed to update physical info", e);
    throw e;
  }
}


export const updateGoal = async (goal_type) => {
  // using PATCH /users/me/profile/form
  try {
    const response = await api.patch("/users/me/profile/form", { goal_type: goal_type });
    console.log("update goal success", response.data);
    return response.data;
  } catch (e) {
    console.error("failed to update goal", e);
    throw e;
  }
}

export const updateConditions = async (conditions) => {
  // conditions should be a list of strings
  try {
    const response = await api.patch("/users/me/profile/form", { conditions: conditions });
    console.log("update conditions success", response.data);
    return response.data;
  } catch (e) {
    console.error("failed to update conditions", e);
    throw e;
  }
}

export const deleteAccount = async (password) => {
  const data = { password: password };
  try {
    // Using generic request for DELETE with body if axios.delete doesn't support it easily in all versions
    const response = await api.delete("/users/me", { data: data });
    console.log("delete account success", response.data);
    return response.data;
  } catch (e) {
    console.error("failed to delete account", e);
    throw e;
  }
}

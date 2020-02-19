import axios from "@/utils/axios";

export function signup(userinfo) {
  return axios.post("/users/signup", {
    username: userinfo.username,
    email: userinfo.email,
    password: userinfo.password,
    role: userinfo.role
  });
}

export function login(userinfo) {
  return axios.post("/users/login", {
    email: userinfo.email,
    password: userinfo.password
  });
}

export function getInfo() {
  return axios.get("/users/userinfo");
}

export function updateUserInfo(userinfo) {
  return axios.post("/users/userinfo", userinfo);
}

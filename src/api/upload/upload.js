import axios from "@/utils/axios";

export function uploadAvatar(avatar) {
  let formData = new FormData();
  formData.append("avatar", avatar.file);
  return axios.post("/upload/avatar", formData);
}

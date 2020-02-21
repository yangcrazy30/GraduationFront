import axios from "@/utils/axios";

export function uploadAvatar(avatar) {
  let formData = new FormData();
  formData.append("avatar", avatar.file);
  return axios.post("/upload/avatar", formData);
}


export function uploadResource(resource, courseId, path) {
  let formData = new FormData();
  formData.append("courseId", courseId);
  formData.append("path", path);
  formData.append("resource", resource.file);
  return axios.post("/resource/upload", formData);
}
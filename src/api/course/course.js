import axios from "@/utils/axios";

export function addCourse(courseInfo) {
  return axios.post("/course/addcourse", courseInfo);
}

export function getTeacherCourse(config) {
  return axios.get("/course/teachercourse");
}

export function getCourseById(id) {
  return axios.get("/course/course", {
    params: {
      id: id
    }
  });
}

export function getStudentCoursesIds() {
  return axios.get("/course/courseids");
}

export function updateStudenCourse(id) {
  return axios.post("/course/studentcourse", { id: id });
}

export function getSubsCourse() {
  return axios.get("/course/subscourse");
}

export function getCourse(config) {
  return axios.get("/course/courses", {
    params: {
      config: config
    }
  });
}

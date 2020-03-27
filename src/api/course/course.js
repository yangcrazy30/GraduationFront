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
  return axios.post("/course/subs", { id: id });
}

export function unSubsCourse(courseid, studentid) {
  return axios.post("/course/unsubs", { courseid: courseid, studentid: studentid });
}

export function getSubsCourse() {
  return axios.get("/course/subscourse");
}

export function getCourse(config, courseName) {
  return axios.get("/course/courses", {
    params: {
      config: config,
      courseName: courseName
    }
  });
}

export function getCourseStudents(config, courseId) {
  return axios.get("/course/students", {
    params: {
      config: config,
      courseId: courseId
    }
  });
}

export function updateFinalGrade(courseid, studentid, grade) {
  return axios.post("/course/finalgrade", {
    courseid: courseid,
    studentid: studentid,
    grade: grade
  })
}
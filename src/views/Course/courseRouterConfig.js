import Course from "views/course/pages/course";
import AllCourse from "views/course/pages/allcourse";
export default [
  {
    name: "allcourse",
    path: "/allcourse",
    component: AllCourse
  },
  {
    name: "course",
    path: "/course/:id",
    component: Course
  }
];

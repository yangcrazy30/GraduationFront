import Study from "views/study/pages/study";
import HomeWork from "views/study/pages/homework/homework";
import BBS from "views/study/pages/bbs/bbs";
import Resource from "views/study/pages/resource/resource";
import Main from "views/study/pages/main";
import BbsDetail from "views/study/pages/bbs/bbsdetail";
import HomeworkDetail from "views/study/pages/homework/homeworkdetail"
import Question from "views/study/pages/question/question";
export default {
  path: "/study/:id",
  component: Study,
  children: [
    {
      name: "study",
      path: "/",
      component: Main
    },
    {
      name: 'question',
      path: "question",
      component: Question
    },
    {
      name: "homework",
      path: "homework",
      component: HomeWork
    },
    {
      name: "bbs",
      path: "bbs",
      component: BBS
    },
    {
      path: "bbs/detail/:postid",
      name: "bbsdetail",
      component: BbsDetail
    },
    {
      path: "homework/detail/:homeworkid",
      name: "homeworkdetail",
      component: HomeworkDetail
    },
    {
      name: "resource",
      path: "resource",
      component: Resource
    }
  ]
};

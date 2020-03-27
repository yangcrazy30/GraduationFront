export default {
  path: "/study/:id",
  component: () => import('views/study/pages/study'),
  children: [
    {
      name: "study",
      path: "/",
      component: () => import('views/study/pages/main')
    },
    {
      name: 'question',
      path: "question",
      component: () => import('views/study/pages/question/question')
    },
    {
      name: "homework",
      path: "homework",
      component: () => import('views/study/pages/homework/homework')
    },
    {
      name: "bbs",
      path: "bbs",
      component: () => import('views/study/pages/bbs/bbs')
    },
    {
      path: "bbs/detail/:postid",
      name: "bbsdetail",
      component: () => import('views/study/pages/bbs/bbsdetail')
    },
    {
      path: "homework/detail/:homeworkid",
      name: "homeworkdetail",
      component: () => import('views/study/pages/homework/homeworkdetail')
    },
    {
      name: "resource",
      path: "resource",
      component: () => import('views/study/pages/resource/resource')
    },
    {
      name: 'management',
      path: 'management',
      component: () => import('views/study/pages/management/management')
    }
  ]
};

export default [
  {
    path: "/login",
    component: () => import('views/Login/pages/login')
  },
  {
    path: "/signup",
    component: () => import('views/Login/pages/signup')
  }
];

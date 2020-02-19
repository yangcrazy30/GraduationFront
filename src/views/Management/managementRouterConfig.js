import Profile from "views/management/pages/index";
import Chat from "views/management/pages/profile/chat";
import CCourse from "views/management/pages/profile/course";
import Setting from "views/management/pages/profile/setting";
export default {
  path: "/profile",
  component: Profile,
  children: [
    {
      name: "setting",
      path: "setting",
      component: Setting
    },
    {
      name: "mycourse",
      path: "course",
      component: CCourse
    },
    {
      name: "chat",
      path: "chat",
      component: Chat
    }
  ]
};

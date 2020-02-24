import Profile from "views/setting/pages/index";
import Chat from "views/setting/pages/profile/chat";
import CCourse from "views/setting/pages/profile/course";
import Setting from "views/setting/pages/profile/setting";
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

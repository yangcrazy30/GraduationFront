export default {
    path: "/profile",
    component: () => import('views/setting/pages/index'),
    children: [
        {
            name: "setting",
            path: "setting",
            component: () => import('views/setting/pages/profile/setting')
        },
        {
            name: "mycourse",
            path: "course",
            component: () => import('views/setting/pages/profile/course')
        },
        {
            name: "chat",
            path: "chat",
            component: () => import('views/setting/pages/profile/chat')
        }
    ]
};

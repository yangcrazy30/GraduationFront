export default [
    {
        name: "allcourse",
        path: "/allcourse",
        component: () => import('views/course/pages/allcourse')
    },
    {
        name: "course",
        path: "/course/:id",
        component: () => import('views/course/pages/course')
    }
];

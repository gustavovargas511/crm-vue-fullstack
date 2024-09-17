import { createRouter, createWebHistory } from "vue-router";
import UsersView from "@/views/UsersView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "users-list",
      component: UsersView,
      props: { title: "Users List" },
    },
    {
      path: "/new-user",
      name: "new-user",
      component: () => import("../views/NewUserView.vue"),
      props: { title: "Add New User" },
    },
    {
      path: "/edit-user/:id",
      name: "edit-user",
      component: () => import("../views/EditUserView.vue"),
      props: { title: "Edit User" },
    },
  ],
});

export default router;

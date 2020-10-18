import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/",
    name: "Todo",
    component: () => import("../views/Todo.vue")
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("../views/Registration.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user-uid");

  if (!user && to.name == "Todo") {
    next("/login");
  } else if (user && to.name !== "Todo") {
    next("/");
  } else {
    next();
  }
});

export default router;

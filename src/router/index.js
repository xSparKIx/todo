import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/login",
    name: "Test",
    component: () => import("../views/Login.vue"),
    beforeEnter(to, from, next) {
      store.getters.CHECK_USER ? next("/") : next();
    }
  },
  {
    path: "/",
    name: "Todo",
    component: () => import("../views/Todo.vue"),
    beforeEnter(to, from, next) {
      store.getters.CHECK_USER ? next() : next("/login");
    }
  },
  {
    path: "/registration",
    name: "Регистрация",
    component: () => import("../views/Registration.vue"),
    beforeEnter(to, from, next) {
      store.getters.CHECK_USER ? next("/") : next();
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

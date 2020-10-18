import { createRouter, createWebHashHistory } from "vue-router";
// import store from "../store";
import firebase from "firebase/app";

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
  // if (to.name == "Todo" && !store.getters.CHECK_USER) next({ name: "Login" });
  // // else if (store.getters.CHECK_USER) next({ name: "Todo" })
  // else next();

  firebase.auth().onAuthStateChanged(user => {
    // !user && to.name == "Todo" ? next("/login") : next();

    if (!user && to.name == "Todo") {
      next("/login");
    } else if (user && to.name !== "Todo") {
      next("/");
    } else {
      next();
    }
  });
});

export default router;

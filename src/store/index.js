import { createStore } from "vuex";

import userStore from "./userStore";
import todoStore from "./todoStore";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
    todoStore
  }
});

import { createStore } from "vuex";

import Exceptions from "./Helpers/Exceptions";
import userStore from "./userStore";
import todoStore from "./todoStore";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Exceptions,
    userStore,
    todoStore
  }
});

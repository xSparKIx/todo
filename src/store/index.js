import { createStore } from "vuex";

import userStore from "./userStore";
import todoStore from "./todoStore";

export default createStore({
  state: {},
  mutations: {},
  actions: {
    /**
     * Функция показа ошибки
     * @param {Object} error - ошибка пришедшая с сервера
     * @returns {Void}
     */
    showError(state, error) {
      console.log(error.message);
      throw error;
    }
  },
  modules: {
    userStore,
    todoStore
  }
});

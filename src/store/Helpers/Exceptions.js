export default {
  state: {
    isLoading: null,
    isError: null
  },

  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setIsError(state, payload) {
      state.isError = payload;
    },
    clearError(state) {
      state.isError = null;
    }
  },

  actions: {
    /**
     * Функция установки загрузки компонентов
     * @param {Boolean} payload - параметр загрузки компонента
     * @returns {void}
     */
    setIsLoading({ commit }, payload) {
      commit("setIsLoading", payload);
    },

    /**
     * Функция установки ошибки компонентов
     * @param {Object} payload - сообщение об ошибке
     * @returns {void}
     */
    setIsError({ commit }, payload) {
      commit("setIsError", payload);
    },

    /**
     * Функция очистки ошибок
     * @returns {void}
     */
    clearError({ commit }) {
      commit("clearError");
    }
  },

  getters: {
    /**
     * Функция получения состояния загрузки
     * @param {Object} state
     * @returns {Boolean} возвращает состояние загрузки
     */
    IS_LOADING(state) {
      return state.isLoading;
    },

    /**
     * Функция получения состояния по ошибкам
     * @param {Object} state
     * @returns {Boolean} возвращает состояние по ошибкам
     */
    IS_ERROR(state) {
      return state.isError;
    }
  }
};

import firebase from "firebase/app";
import UserHelper from "./Helpers/UserHelper";

export default {
  state: {
    user: null
  },

  mutations: {
    onUserSet(state, uid) {
      state.user = uid;
    }
  },

  actions: {
    /**
     * Функция регистрации пользователя
     * @param {Object} {} - Объект, содержащий email , пароль и имя пользователя
     * @returns {void}
     */
    async registerUser({ commit }, { name, email, password }) {
      commit("clearError");
      commit("setIsLoading", true);

      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(result => {
            result.user.updateProfile({
              displayName: name
            });
          });

        commit("onUserSet", new UserHelper(user.user.uid));
        commit("setIsLoading", false);
      } catch (error) {
        commit("setIsLoading", false);
        commit("setIsError", error.message);
        throw error;
      }
    },

    /**
     * Функция авторизации пользователя
     * @param {Object} {} - Объект, содержащий email и пароль пользователя
     * @returns  {void}
     */
    async loginUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setIsLoading", true);

      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        commit("onUserSet", new UserHelper(user.user.uid));
        commit("setIsLoading", false);
      } catch (error) {
        commit("setIsLoading", false);
        commit("setIsError", error.message);
        throw error;
      }
    },

    /**
     * Функция авторизации пользователя после повторного входа
     * @param {Object} payload - Объект, содержащий email и пароль пользователя
     * @returns  {void}
     */
    logUser({ commit }, payload) {
      commit("onUserSet", new UserHelper(payload.uid));
    },

    /**
     * Функция деавторизации пользователя
     * @returns {void}
     */
    logoutUser({ commit }) {
      firebase.auth().signOut();
      commit("onUserSet", null);
    }
  },

  getters: {
    /**
     * Функция получения пользователя
     * @param {Object} state
     * @returns {Object} - объект содержащий данные о пользователе
     */
    USER(state) {
      return state.user;
    },

    /**
     * Функция проверки авторизации пользователя
     * @param {Object} state
     * @returns {Boolean} - состояние авторизации пользователя
     */
    CHECK_USER(state) {
      return state.user !== null;
    }
  }
};

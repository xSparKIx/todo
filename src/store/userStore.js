import firebase from "firebase/app";
import User from "./Models/User";

export default {
  state: {
    user: null
  },

  mutations: {
    userSet(state, uid) {
      state.user = uid;
    }
  },

  actions: {
    /**
     * Функция регистрации пользователя
     * @param {Object} {} - Объект, содержащий email, пароль и имя пользователя
     * @returns {Void}
     */
    async registerUser({ commit, dispatch }, { name, email, password }) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(result => {
            result.user.updateProfile({
              displayName: name
            });
            commit("userSet", new User(result.user.uid));
            localStorage.setItem("user-uid", result.user.uid);
          });
      } catch (error) {
        dispatch("showError", error);
      }
    },

    /**
     * Функция авторизации пользователя
     * @param {Object} {} - Объект, содержащий email и пароль пользователя
     * @returns  {Void}
     */
    async loginUser({ commit, dispatch }, { email, password }) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(user => {
            commit("userSet", new User(user.user.uid));
            localStorage.setItem("user-uid", user.user.uid);
          });
      } catch (error) {
        dispatch("showError", error);
      }
    },

    /**
     * Функция авторизации пользователя после повторного входа
     * @param {Object} payload - Объект, содержащий email и пароль пользователя
     * @returns  {Void}
     */
    logUser({ commit }, payload) {
      commit("userSet", new User(payload.uid));
    },

    /**
     * Функция деавторизации пользователя
     * @returns {Void}
     */
    logoutUser({ commit }) {
      firebase.auth().signOut();
      commit("userSet", null);
      localStorage.removeItem("user-uid");
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

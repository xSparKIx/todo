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
     * @param {Object} {} - Объект, содержащий email , пароль и имя пользователя
     * @returns {void}
     */
    async registerUser({ commit }, { name, email, password }) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(result => {
            result.user.updateProfile({
              displayName: name
            });
            commit("userSet", new User(result.user.uid));
          });
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },

    /**
     * Функция авторизации пользователя
     * @param {Object} {} - Объект, содержащий email и пароль пользователя
     * @returns  {void}
     */
    async loginUser({ commit }, { email, password }) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(user => {
            commit("userSet", new User(user.user.uid));
          });
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },

    /**
     * Функция авторизации пользователя после повторного входа
     * @param {Object} payload - Объект, содержащий email и пароль пользователя
     * @returns  {void}
     */
    logUser({ commit }, payload) {
      commit("userSet", new User(payload.uid));
    },

    /**
     * Функция деавторизации пользователя
     * @returns {void}
     */
    logoutUser({ commit }) {
      firebase.auth().signOut();
      commit("userSet", null);
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

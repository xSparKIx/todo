import { db } from "@/config/fireBaseConfig.js";

export default {
  state: {
    todos: []
  },

  mutations: {
    loadTodos(state, payload) {
      state.todos = payload;
    },
    todoAdd(state, payload) {
      state.todos.push(payload);
    }
  },

  actions: {
    /**
     * Функция загрузки todo
     * @param {String} uid - id пользователя, для которого загружаем todo
     * @returns {Void}
     */
    async loadTodos({ commit }, uid) {
      try {
        const arrTodos = [];

        await db
          .collection("todos")
          .where("uid", "==", uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const data = doc.data();
              data.id = doc.id;

              arrTodos.push(data);
            });
          });

        commit("loadTodos", arrTodos);
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
    /**
     * Функция добавления todo
     * @param {*} payload - добавляемое todo
     */
    async addTodo({ commit }, payload) {
      try {
        const todo = await db.collection("todos").add(payload);
        payload.id = todo.id;

        commit("todoAdd", payload);
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },

    /**
     * Функция удаления todo
     * @param {*} todoId - id удаляемого todo
     */
    async deleteTodo(state, todoId) {
      try {
        await db
          .collection("todos")
          .doc(todoId)
          .delete()
          .catch(error => {
            console.error("Error removing document: ", error);
          });
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },

    /**
     * Функция закрытия todo
     * @param {Object} payload - id и статус состояния todo (закрываем todo или повторно открываем todo)
     */
    async closeTodo(state, payload) {
      try {
        await db
          .collection("todos")
          .doc(payload.id)
          .set(
            {
              closed: payload.todoStatus
            },
            { merge: true }
          );
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },

    /**
     * Функция изменения данных todo
     * @param {Object} todo - измененное todo
     */
    async editTodo(state, todo) {
      try {
        await db
          .collection("todos")
          .doc(todo.id)
          .set(todo, { merge: true });
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    }
  },

  getters: {
    /**
     * Функция получения todo
     * @param {Object} state
     * @returns {Proxy} возвращает список todo
     */
    TODOS(state) {
      return state.todos;
    }
  }
};

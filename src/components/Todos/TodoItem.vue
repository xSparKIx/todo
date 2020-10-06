<!-- Компонент пункта todo -->

<template lang="html">
  <div class="col mt-3">
    <div class="card h-100 shadow-sm">
      <div
        class="card-header d-flex justify-content-end bg-transparent border-bottom-0 pb-0"
      >
        <button
          class="btn todo-button p-0 rounded-circle d-flex justify-content-center align-items-center mr-1"
          @click="editTodo(todo)"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-pencil"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
            />
          </svg>
        </button>
        <button
          type="button"
          class="btn btn-link todo-button p-0 rounded-circle d-flex justify-content-center align-items-center"
          @click="closeTodo(todo.id, !todo.closed)"
          :class="{ closed: todo.closed }"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-check"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
            />
          </svg>
        </button>
      </div>
      <div class="card-body">
        <div class="title-cont d-flex align-items-center">
          <svg viewBox="0 0 24 24" class="todo-color mr-2">
            <circle cx="12" cy="12" r="12" :fill="todo.color"></circle>
          </svg>
          <h5 class="card-title d-flex align-items-center m-0">
            {{ todo.name }}
          </h5>
        </div>
        <p class="card-text ml-3 text-muted">{{ todo.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",

  props: {
    todo: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  methods: {
    /**
     * Функция закрытия todo
     * @param {String} id - id закрываемой todo
     * @param {Boolean} todoStatus - статус состояния todo (закрываем todo или повторно открываем todo)
     */
    closeTodo(id, todoStatus) {
      this.$store.dispatch("closeTodo", { id, todoStatus }).then(() => {
        this.$store.dispatch("loadTodos", this.$store.getters.USER.id);
      });
    },

    /**
     * Функция передачи данных редактируемого Todo
     * @param {Object} todo - данные Todo
     * @returns {Void}
     */
    editTodo(todo) {
      this.$emit("send-todo-info", todo);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/todoItem.scss";
</style>

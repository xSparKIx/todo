<!-- Шапка страницы Todo -->

<template>
  <section id="todo-top-sec" class="project-container">
    <div class="jumbotron bg-transparent mt-5 px-0 pb-0">
      <p>Проект: Разработка приложения</p>

      <div
        class="d-flex justify-content-md-between align-items-md-center flex-column flex-md-row"
      >
        <h1 class="display-4">Todoka</h1>
        <div
          class="button-group text-md-right d-flex flex-row-reverse flex-md-row justify-content-end"
        >
          <div class="d-flex align-items-center">
            <button
              class="change-view btn btn-primary mx-2 bg-transparent border-0 p-0"
              :class="{ active: isColumn }"
              @click="sendIsColumn(true)"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-grid-3x3"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13zM1.5 1a.5.5 0 0 0-.5.5V5h4V1H1.5zM5 6H1v4h4V6zm1 4V6h4v4H6zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5v-4zm1 0h4v4H6v-4zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11h-4zm0-1h4V6h-4v4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11v4zm-1 0H6V1h4v4z"
                />
              </svg>
            </button>
            <button
              class="change-view btn btn-primary mx-2 bg-transparent border-0 p-0"
              :class="{ active: !isColumn }"
              @click="sendIsColumn(false)"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-list-ul"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                />
              </svg>
            </button>
          </div>
          <button
            class="active-buttons btn btn-primary mx-2 d-inline-flex justify-content-center align-items-center rounded-circle bg-gradient"
            @click="refreshTodos"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-arrow-counterclockwise"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
              />
              <path
                d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
              />
            </svg>
          </button>
          <button
            class="active-buttons btn btn-primary d-inline-flex justify-content-center align-items-center rounded-circle bg-gradient"
            @click="addTodo"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-plus"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </button>
        </div>
      </div>
      <hr class="my-4" />
    </div>
  </section>
</template>

<script>
export default {
  name: "TodoHeader",

  data() {
    return {
      isColumn: true
    };
  },

  methods: {
    /**
     * Функция передачи состояния отображения Todo
     * @param {Boolean} status - данные отображаются в колонку
     * @returns {Void}
     */
    sendIsColumn(status) {
      this.isColumn = status;
      this.$emit("is-column", status);
    },

    /**
     * Функция добавления нового todo
     * @returns {void}
     */
    addTodo() {
      const todo = {
        uid: this.$store.getters.USER.id,
        name: "New Todo",
        description: "Todo description",
        closed: false,
        color: null
      };

      this.$store.dispatch("addTodo", todo);
    },

    /**
     * Функция обновления списка todo
     * @returns {void}
     */
    refreshTodos() {
      this.$store.dispatch("loadTodos", this.$store.getters.USER.id);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/nav.scss";
</style>

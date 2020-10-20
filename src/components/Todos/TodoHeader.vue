<!-- Шапка страницы Todo -->

<template>
  <section id="todo-top-sec" class="project-container">
    <div class="jumbotron bg-transparent px-0 pb-0">
      <p class="sub-header">Проект: <u>Разработка приложения</u></p>

      <div
        class="d-flex justify-content-md-between align-items-md-center flex-column flex-md-row"
      >
        <h1>Todoka</h1>
        <div
          class="button-group text-md-right d-flex flex-row-reverse flex-md-row justify-content-end"
        >
          <div class="d-flex align-items-center">
            <button
              class="change-view btn btn-primary bg-transparent border-0 p-0"
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
              class="change-view btn btn-primary bg-transparent border-0 p-0"
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
            class="active-buttons btn btn-primary d-inline-flex justify-content-center align-items-center rounded-circle bg-gradient"
            @click="addTodo"
            v-if="isAutorized"
          >
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.875 6.25H9.25V0.625C9.25 0.3125 8.9375 0 8.625 0H7.375C7.02344 0 6.75 0.3125 6.75 0.625V6.25H1.125C0.773438 6.25 0.5 6.5625 0.5 6.875V8.125C0.5 8.47656 0.773438 8.75 1.125 8.75H6.75V14.375C6.75 14.7266 7.02344 15 7.375 15H8.625C8.9375 15 9.25 14.7266 9.25 14.375V8.75H14.875C15.1875 8.75 15.5 8.47656 15.5 8.125V6.875C15.5 6.5625 15.1875 6.25 14.875 6.25Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      <hr />
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

  computed: {
    /**
     * Проверка авторизирован ли пользователь
     * @param {}
     * @returns {Boolean} - статус авторизации пользователя
     */
    isAutorized() {
      return this.$store.getters.CHECK_USER;
    }
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
        color: "#000000"
      };

      this.$store.dispatch("addTodo", todo);
    }
  }
};
</script>

<style lang="scss">
#todo-top-sec {
  .jumbotron {
    margin: 75px 0 0 0;

    h1 {
      color: #3f50e7;
      font-weight: 400;
      font-size: 60px;
      margin: 0;
    }

    .change-view {
      margin: 0 10px;

      svg,
      path {
        color: #b3b6c5;
        font-size: 20px;
      }

      &.active {
        svg,
        path {
          color: #3f50e7;
        }
      }
    }

    .active-buttons {
      width: 40px;
      height: 40px;
      margin: 0 0 0 40px;
    }

    .sub-header,
    .sub-header u {
      color: #b3b6c5;
      margin: 0 0 30px 0;
      font-size: 20px;
    }

    hr {
      margin: 40px 0 65px 0;
    }
  }
}

@media (max-width: 768px) {
  #todo-top-sec {
    .jumbotron {
      h1 {
        margin: 0 0 40px 0;
        font-size: 40px;
      }
      .sub-header,
      .sub-header u {
        font-size: 15px;
      }
      .active-buttons {
        margin: 0 20px 0 0;
      }
    }
  }
}
</style>

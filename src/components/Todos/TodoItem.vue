<!-- Компонент пункта todo -->

<template>
  <div class="col mt-3">
    <div class="card h-100 shadow-sm">
      <div
        class="card-header bg-transparent border-bottom-0"
        @click.self="toggleClass('active')"
      >
        <button
          class="btn todo-button p-0 rounded-circle d-flex justify-content-center align-items-center"
          @click="editTodo(todo)"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.79688 2.70306L1.28125 9.21869L1 11.8906C0.953125 12.2421 1.25781 12.5468 1.60938 12.4999L4.28125 12.2187L10.7969 5.70306L7.79688 2.70306ZM12.6484 2.25775L11.2422 0.851501C10.8203 0.406189 10.0938 0.406189 9.64844 0.851501L8.33594 2.164L11.3359 5.164L12.6484 3.8515C13.0938 3.40619 13.0938 2.67963 12.6484 2.25775Z"
              fill="#B3B6C5"
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
      <div class="card-body" @click="toggleClass('active')">
        <div class="title-cont align-items-center">
          <svg viewBox="0 0 24 24" class="todo-color mr-2">
            <circle cx="12" cy="12" r="12" :fill="todo.color"></circle>
          </svg>
          <h5 class="card-title d-flex align-items-center m-0">
            {{ todo.name }}
          </h5>
        </div>
        <p class="card-text ml-3">{{ todo.description }}</p>
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
    },

    /**
     * Функция переключения классов
     * @param {String} cls - переключаемый класс
     * @returns {Void}
     */
    toggleClass(cls) {
      event.currentTarget.parentElement.classList.toggle(cls);
    }
  }
};
</script>

<style lang="scss">
.card {
  border-radius: 10px;

  .card-header {
    display: flex;
    padding: 20px 20px 0 20px;
    justify-content: flex-end;
    transition: all 1s;

    .todo-button {
      width: 40px;
      height: 40px;
      border: solid 2px #f3f5f8;

      &:first-child {
        margin: 0 10px 0 0;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      &.closed {
        background: #f5f6fa;
        border-color: #f5f6fa;

        svg,
        path {
          color: #3f50e7;
        }
      }

      svg,
      path {
        color: #b3b6c5;
      }
    }
  }
  .card-body {
    padding: 80px 20px 25px 20px;
    transition: all 1s;

    .title-cont {
      display: flex;
      margin: 0 0 10px 0;

      .todo-color {
        width: 15px;
        border: solid 1px rgba(0, 0, 0, 0.03);
        border-radius: 50%;
        padding: 2px;
        background: rgba(0, 0, 0, 0.03);
      }

      .card-title {
        color: #333;
      }
    }

    .card-text {
      font-family: "San Francisco Pro Display Regular";
      color: #babecb;
      font-size: 14px;
    }
  }
}

.compact {
  .card {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;

    .card-header {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      justify-content: flex-start;
      width: 25%;
      padding: 0;

      .todo-button {
        &:first-child {
          margin: 0 10px 0 10px;
        }
      }
    }

    .card-body {
      width: calc(75% - 10px);
      display: flex;
      align-items: center;
      padding: 20px 10px 20px 20px;

      .title-cont {
        margin: 0;
      }
    }

    .card-body,
    .card-text,
    .card-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

@media (max-width: 768px) {
  .compact {
    .card {
      overflow: hidden;

      .card-header,
      .card-body {
        width: 100%;
      }

      .card-header {
        position: absolute;
        height: 100%;
        transform: translateX(100%);
      }

      &.active {
        .card-header {
          transform: translateX(0%);
        }
        .card-body {
          transform: translateX(100%);
        }
      }
    }
  }
}
</style>

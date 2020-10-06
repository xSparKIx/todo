<!-- Компонент списка todo -->

<template lang="html">
  <section id="todo-list" class="project-container pb-5">
    <div
      class="row row-cols-1 g-4"
      :class="[inColumn ? 'row-cols-md-4' : 'compact']"
    >
      <TodoItem
        v-for="todo in todos"
        :todo="todo"
        :key="todo.id"
        @send-todo-info="editTodo"
      />
    </div>
  </section>
</template>

<script>
import TodoItem from "@/components/Todos/TodoItem.vue";

export default {
  name: "TodoList",

  props: {
    inColumn: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },

  components: {
    TodoItem
  },

  computed: {
    /**
     * Функция получения todo из стора todoStore
     * @returns {Proxy} массив todo
     */
    todos() {
      return this.$store.getters.TODOS;
    }
  },

  methods: {
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

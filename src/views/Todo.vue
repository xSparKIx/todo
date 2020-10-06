<!-- Страница Todo -->

<template>
  <TodoHeader @is-column="setIsColumn" />
  <TodoList :inColumn="isColumn" @send-todo-info="sendDataToModal" />
  <EditingModal :todo="editingTodoId" />
</template>

<script>
import TodoHeader from "@/components/Todos/TodoHeader.vue";
import TodoList from "@/components/Todos/TodoList.vue";
import EditingModal from "@/components/Includes/Modal.vue";

export default {
  name: "TodoPage",

  data() {
    return {
      isColumn: true,
      editingTodoId: null
    };
  },

  components: {
    TodoHeader,
    TodoList,
    EditingModal
  },

  methods: {
    /**
     * Функция передачи данных редактируемого Todo
     * @param {Object} todo - данные Todo
     * @returns {Void}
     */
    sendDataToModal(todo) {
      this.editingTodoId = todo;
    },

    /**
     * Функция передачи состояния отображения Todo
     * @param {Boolean} status - данные отображаются в колонку
     * @returns {Void}
     */
    setIsColumn(status) {
      this.isColumn = status;
    }
  }
};
</script>

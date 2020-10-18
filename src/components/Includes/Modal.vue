<!-- Модальное окно редактирования todo-->

<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Карточка редактирования
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="exampleInputName">Наименование</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                v-model="computedTodo.name"
              />
            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea1">Описание</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                v-model="computedTodo.description"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="exampleInputColor">Цвет</label>
              <input
                type="color"
                class="form-control"
                id="exampleInputColor"
                aria-describedby="emailHelp"
                v-model="computedTodo.color"
              />
            </div>
            <input
              type="text"
              name="id"
              class="d-none"
              v-model="computedTodo.id"
            />
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger border-0"
            data-dismiss="modal"
            @click="deleteTodo(todo && todo.id)"
          >
            Удалить позцию
          </button>
          <button
            type="submit"
            id="save-changes"
            class="btn btn-primary"
            data-dismiss="modal"
            @click="saveChanges(todo && todo)"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditingModal",

  props: {
    todo: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  computed: {
    /**
     * Проверка на наличие todo
     */
    computedTodo() {
      return this.todo
        ? this.todo
        : {
            id: null,
            name: null,
            description: null,
            color: null
          };
    }
  },

  methods: {
    /**
     * Функция удаления todo
     * @param {String} id - id удаляемого todo
     * @returns {Void}
     */
    deleteTodo(id) {
      this.$store.dispatch("deleteTodo", id).then(() => {
        this.$store.dispatch("loadTodos", this.$store.getters.USER.id);
      });
    },
    /**
     * Функция сохранения изменений
     * @returns {Void}
     */
    saveChanges() {
      this.$store.dispatch("editTodo", this.todo);
    }
  }
};
</script>

<style lang="scss">
#exampleModal {
  #save-changes {
    border: none;
    background: linear-gradient(90deg, #61de6e 0%, #6df77a 100%);
  }
}
</style>

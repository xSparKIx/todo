<!-- Компонент навигации приложения -->

<template>
  <nav
    class="navbar fixed-top bg-white"
    v-bind:class="{ 'shadow-sm': isAutorized }"
  >
    <div class="navbar-brand">
      <img
        src="@/assets/logo.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
        loading="lazy"
      />
      Todo
    </div>
    <button
      v-on:click="logout"
      v-if="isAutorized"
      class="btn btn-primary bg-gradient"
    >
      Выход
    </button>
    <router-link to="/login" class="btn btn-primary bg-gradient" v-else
      >Войти</router-link
    >
  </nav>
</template>

<script>
export default {
  name: "Nav",

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
     *  Функция выхода из учетной записи.
     *  @param {}
     *  @returns {void}
     */
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    }
  }
};
</script>

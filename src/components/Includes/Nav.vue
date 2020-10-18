<!-- Компонент навигации приложения -->

<template>
  <nav class="navbar fixed-top" :class="{ 'shadow-sm bg-white': isAutorized }">
    <div class="navbar-brand">
      <img
        src="@/assets/images/logo.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
        loading="lazy"
      />
      <span class="nav-title">Todoka</span>
      <div class="nav-tag" v-if="isAutorized">team</div>
    </div>
    <button @click="logout" v-if="isAutorized" class="btn logout btn-primary">
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

<style lang="scss">
nav {
  .logout,
  .logout:hover {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: #3f50e7;
  }

  .nav-title {
    margin: 0 12px 0 20px;
  }

  .nav-tag {
    display: inline-block;
    padding: 3px 10px;
    background: #eff0f3;
    border-radius: 2px;
    font-size: 12px;
  }
}
</style>

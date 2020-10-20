<!-- Компонент навигации приложения -->

<template>
  <nav class="navbar fixed-top" :class="{ active: isAutorized }">
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
     *  @returns {Void}
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

  .navbar-brand {
    display: flex;
    align-items: center;

    .nav-title {
      margin: 0 12px 0 20px;
      font-size: 30px;
    }

    .nav-tag {
      display: inline-block;
      padding: 3px 10px;
      background: #eff0f3;
      border-radius: 2px;
      font-size: 12px;
    }
  }

  .btn {
    font-size: 20px;
    padding: 8px 24px;
    border-radius: 5px;
  }

  &.active {
    background: #fff;
    box-shadow: 0px 15px 25px rgba(154, 160, 189, 0.1);
  }
}

@media (max-width: 768px) {
  nav {
    .navbar-brand {
      .nav-title {
        margin: 0 10px;
        font-size: 20px;
      }
    }
    .btn {
      font-size: 15px;
    }
  }
}
</style>

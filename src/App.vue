<template>
  <Nav />
  <router-view />
</template>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "@/assets/styles/styles.scss";
</style>

<script>
// Инициализация БД
import firebase from "firebase/app";
import Nav from "@/components/Includes/Nav.vue";

export default {
  components: {
    Nav
  },

  created() {
    /**
     * Авторизация пользователя после повторного входа
     * @param {}
     * @returns {void}
     */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("logUser", user);
        this.$store.dispatch("loadTodos", user.uid);
        this.$router.push("/");
      }
    });
  }
};
</script>

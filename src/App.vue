<template>
  <Nav />
  <router-view />
</template>

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
     * @returns {Void}
     */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("logUser", user);
        this.$store.dispatch("loadTodos", user.uid);
      }
    });
  }
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";

@font-face {
  font-family: "San Francisco Pro Display Regular";
  src: url("./assets/fonts/SFProDisplay/SFProDisplay-Regular.eot");
  src: url("./assets/fonts/SFProDisplay/SFProDisplay-Regular.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/SFProDisplay/SFProDisplay-Regular.woff") format("woff"),
    url("./assets/fonts/SFProDisplay/SFProDisplay-Regular.ttf")
      format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "RadioGrotesk";
  src: url("./assets/fonts/RadioGrotesk/RadioGrotesk.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
}

* {
  font-family: "RadioGrotesk";
  color: #393c46;
}

body {
  background-color: #fafbfc;
}

.bg-gradient {
  background: linear-gradient(90deg, #838bd8 0%, #283bec 100%);
  border: none;
}

.project-container {
  width: 90%;
  margin: auto;
}

[data-tooltip] {
  position: relative;

  &::before,
  &::after {
    position: absolute;
    top: 0;
    opacity: 0;
    visibility: hidden;
    box-shadow: 0px 10px 150px rgba(40, 44, 66, 0.1);
    transition: all 1s;
  }

  &::before {
    content: "";
    z-index: 3;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 10px solid #fff;
    right: 27px;
  }

  &::after {
    content: attr(data-tooltip);
    z-index: 2;
    width: 320px;
    max-width: 100%;
    right: -250px;
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    color: #b3b6c5;
    font-size: 14px;
  }

  &:hover {
    &::before,
    &::after {
      opacity: 1;
      visibility: visible;
    }

    &::before {
      transform: translateY(55px);
    }

    &::after {
      transform: translateY(65px);
    }
  }
}

@media (max-width: 970px) {
  [data-tooltip] {
    &::after {
      right: 0;
    }
  }
}

@media (max-width: 768px) {
  [data-tooltip] {
    &::before {
      right: 18px;
    }

    &:hover {
      &::before {
        transform: translateY(40px);
      }

      &::after {
        transform: translateY(50px);
      }
    }
  }
}
</style>

<!-- Форма авторизации -->

<template>
  <div class="form-container bg-white shadow-sm">
    <h2>Войти</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label
          for="exampleInputEmail1"
          :class="{ 'is-invalid': incorrectEmail }"
          >E-mail</label
        >
        <div
          class="input-grp"
          :data-tooltip="
            incorrectEmail ? 'Корректно заполните обязательные поля.' : null
          "
        >
          <input
            type="email"
            v-model="email"
            class="form-control"
            :class="[
              { 'is-invalid': incorrectEmail },
              !incorrectEmail && incorrectEmail !== null && 'is-valid'
            ]"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            @change="onInputChange"
          />
          <img
            v-if="!incorrectEmail && incorrectEmail !== null"
            src="./assets/images/valid.svg"
            alt="Valid Logo"
          />
          <img
            v-if="incorrectEmail"
            src="./assets/images/warn.svg"
            alt="Warn Logo"
          />
        </div>
      </div>
      <div class="form-group">
        <label
          for="exampleInputPassword1"
          :class="{ 'is-invalid': incorrectPassword }"
          >Пароль</label
        >
        <div
          class="input-grp"
          :data-tooltip="
            incorrectPassword
              ? 'Your password must be at least 6 characters long and must contain letters, numbers and special characters. Cannot contain whitespace.'
              : null
          "
        >
          <input
            type="password"
            v-model="password"
            class="form-control"
            :class="[
              { 'is-invalid': incorrectPassword },
              !incorrectPassword && incorrectPassword !== null && 'is-valid'
            ]"
            id="exampleInputPassword1"
            @change="onInputChange"
          />
          <img
            v-if="!incorrectPassword && incorrectPassword !== null"
            src="./assets/images/valid.svg"
            alt="Valid Logo"
          />
          <img
            v-if="incorrectPassword"
            src="./assets/images/warn.svg"
            alt="Warn Logo"
          />
        </div>
      </div>

      <small
        class="d-block text-center my-3 text-danger"
        v-if="error == 'auth/user-not-found'"
        >Пользователь с такой почтой не найден</small
      >
      <small
        class="d-block text-center my-3 text-danger"
        v-if="error == 'auth/wrong-password'"
        >Неправильный пароль для пользователя</small
      >
      <small
        class="d-block text-center my-3 text-danger"
        v-if="error == 'auth/too-many-requests'"
        >Доступ к этой учетной записи был временно отключен из-за многих
        неудачных попыток входа в систему. Вы можете сразу же восстановить его,
        сбросив свой пароль, или попробовать еще раз позже.</small
      >

      <button type="submit" class="btn btn-primary w-100" :disabled="!isValid">
        Войти
      </button>
    </form>

    <p>
      Not a todooist?
      <router-link to="/registration">Create an account</router-link>
    </p>
  </div>
</template>

<script>
import "./assets/styles/form.scss";

export default {
  name: "LoginForm",

  data() {
    return {
      email: null,
      incorrectEmail: null,
      password: null,
      incorrectPassword: null,
      error: null
    };
  },

  computed: {
    /**
     * Функция получения статуса валидности
     * @returns {Boolean} статус валидности
     */
    isValid() {
      if (this.incorrectEmail === null || this.incorrectPassword === null)
        return false;

      return !this.incorrectEmail && !this.incorrectPassword;
    }
  },

  methods: {
    /**
     * Событие отправки формы авторизации
     * @param {}
     * @returns {Void}
     */
    onSubmit() {
      const user = {
        email: this.email,
        password: this.password
      };

      this.error = null;

      this.$store
        .dispatch("loginUser", user)
        .then(() => {
          !this.error && this.$router.push("/");
        })
        .catch(error => {
          this.error = error.code;
        });
    },

    onInputChange(event) {
      let type = event.target.type,
        val = event.target.value,
        reg = null;

      switch (type) {
        case "email":
          reg = new RegExp(
            /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i
          );

          if (!val || !reg.test(val)) {
            this.incorrectEmail = true;
            this.error = "auth/argument-error";
          } else {
            this.incorrectEmail = false;
          }

          break;
        case "password":
          reg = new RegExp(/^[a-zA-Z0-9]/i);

          if (!val || !reg.test(val) || val.length < 6) {
            this.incorrectPassword = true;
            this.error = "auth/argument-error";
          } else {
            this.incorrectPassword = false;
          }

          break;

        default:
          break;
      }
    }
  }
};
</script>

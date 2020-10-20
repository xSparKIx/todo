<!-- Форма регистрации -->

<template>
  <div class="form-container bg-white shadow-sm">
    <h2>Регистрация</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="exampleInputName1" :class="{ 'is-invalid': incorrectName }"
          >Имя</label
        >
        <div
          class="input-grp"
          :data-tooltip="
            incorrectName ? 'Корректно заполните обязательные поля.' : null
          "
        >
          <input
            type="text"
            v-model="name"
            class="form-control"
            :class="[
              { 'is-invalid': incorrectName },
              !incorrectName && incorrectName !== null && 'is-valid'
            ]"
            id="exampleInputName1"
            @change="onInputChange"
          />
          <img
            v-if="!incorrectName && incorrectName !== null"
            src="./assets/images/valid.svg"
            alt="Valid Logo"
          />
          <img
            v-if="incorrectName"
            src="./assets/images/warn.svg"
            alt="Warn Logo"
          />
        </div>
      </div>
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
              {
                'is-invalid': incorrectPassword
              },
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
        v-if="error == 'auth/mismatch-password'"
        >Пароли не совпадают</small
      >
      <small
        class="d-block text-center my-3 text-danger"
        v-if="error == 'auth/email-already-in-use'"
        >Пользователь с таким email уже существует</small
      >
      <small
        class="d-block text-center my-3 text-danger"
        v-if="error == 'auth/invalid-email'"
        >Введен некорректный адрес электронной почты</small
      >

      <button type="submit" class="btn btn-primary w-100" :disabled="!isValid">
        Регистрация
      </button>
    </form>

    <p>
      Already a todooist?
      <router-link to="/login">Log in account</router-link>
    </p>
  </div>
</template>

<script>
import "./assets/styles/form.scss";

export default {
  name: "RegistrationForm",

  data() {
    return {
      // Данные пользователя
      name: null,
      email: null,
      password: null,

      // Ошибки
      error: null,
      incorrectName: null,
      incorrectEmail: null,
      incorrectPassword: null
    };
  },

  computed: {
    /**
     * Функция получения статуса валидности
     * @returns {Boolean} статус валидности
     */
    isValid() {
      if (
        this.incorrectName === null ||
        this.incorrectEmail === null ||
        this.incorrectPassword === null
      )
        return false;

      return (
        !this.incorrectName && !this.incorrectEmail && !this.incorrectPassword
      );
    }
  },

  methods: {
    /**
     * Событие отправки формы регистрации
     * @param {}
     * @returns {void}
     */
    onSubmit() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      this.error = null;

      this.$store
        .dispatch("registerUser", user)
        .catch(error => {
          this.error = error.code;
        })
        .then(() => {
          !this.error && this.$router.push("/");
        });
    },

    onInputChange(event) {
      let type = event.target.type,
        val = event.target.value,
        reg = null;

      switch (type) {
        case "text":
          reg = new RegExp(/^[а-яА-Яa-zA-Z0-9]/i);

          if (!val || !reg.test(val)) {
            this.incorrectName = true;
            this.error = "auth/argument-error";
          } else {
            this.incorrectName = false;
          }

          break;

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

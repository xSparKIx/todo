<!-- Форма регистрации -->

<template>
  <div class="form-container p-4 bg-white rounded shadow-sm">
    <h2>Регистрация</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="exampleInputName1">Имя</label>
        <input
          type="text"
          v-model="name"
          class="form-control"
          :class="[
            { 'is-invalid': incorrectName },
            !incorrectName && incorrectName !== null && 'is-valid'
          ]"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
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
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Пароль</label>
        <input
          type="text"
          v-model="password"
          class="form-control"
          :class="[
            { 'is-invalid': incorrectPassword || incorrectRepeatPassword },
            (!incorrectPassword || !incorrectRepeatPassword) &&
              incorrectPassword !== null &&
              incorrectRepeatPassword !== null &&
              'is-valid'
          ]"
          id="exampleInputPassword1"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Минимальная длина пароля должна составлять 6 символов</small
        >
      </div>
      <div class="form-group">
        <label for="repeatPassword">Повторите пароль</label>
        <input
          type="text"
          v-model="repeatpassword"
          class="form-control"
          :class="[
            { 'is-invalid': incorrectPassword || incorrectRepeatPassword },
            (!incorrectPassword || !incorrectRepeatPassword) &&
              incorrectPassword !== null &&
              incorrectRepeatPassword !== null &&
              'is-valid'
          ]"
          id="repeatPassword"
        />
      </div>

      <small
        class="d-block text-center my-3 text-danger"
        v-if="error == 'auth/argument-error'"
        >Корректно заполните обязательные поля</small
      >
      <small
        class="d-block text-center my-3 text-danger"
        v-if="error == 'auth/weak-password'"
        >Пароль должен содержать не менее 6 символов</small
      >
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

      <button type="submit" class="btn btn-primary w-100 bg-gradient">
        Регистрация
      </button>
      <router-link to="/login" class="d-block text-center my-2"
        >или Войти</router-link
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "RegistrationForm",

  data() {
    return {
      // Данные пользователя
      name: null,
      email: null,
      password: null,
      repeatpassword: null,

      // Ошибки
      error: null,
      incorrectName: null,
      incorrectEmail: null,
      incorrectPassword: null,
      incorrectRepeatPassword: null
    };
  },

  methods: {
    /**
     * Событие отправки формы регистрации
     * @param {}
     * @returns {void}
     */
    onSubmit() {
      // Объявление регулярных выражений
      let regEmail = new RegExp(
          /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i
        ),
        regPassword = new RegExp(/^[a-zA-Z0-9]/i),
        regName = new RegExp(/^[а-яА-Яa-zA-Z0-9]/i);

      // Очистка ошибок
      this.error = null;
      this.incorrectName = false;
      this.incorrectEmail = false;
      this.incorrectPassword = false;
      this.incorrectRepeatPassword = false;

      // Проверка имени пользователя
      if (!this.name || !regName.test(this.name)) {
        this.incorrectName = true;
        this.error = "auth/argument-error";
      }

      // Проверка email
      if (!this.email || !regEmail.test(this.email)) {
        this.incorrectEmail = true;
        this.error = "auth/argument-error";
      }

      // Проверка пароля
      if (
        !this.password ||
        !regPassword.test(this.password) ||
        this.password.length < 6
      ) {
        this.incorrectPassword = true;
        this.error = "auth/argument-error";
      }

      // Проверка паролей на совпадение
      if (this.password !== this.repeatpassword) {
        this.incorrectRepeatPassword = true;
        this.error = "auth/mismatch-password";
      }

      if (!this.error) {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password
        };

        this.$store.dispatch("registerUser", user).catch(error => {
          this.error = error.code;
        });
      }
    }
  }
};
</script>

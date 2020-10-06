<!-- Форма авторизации -->

<template>
  <div class="form-container p-4 bg-white rounded shadow-sm">
    <h2>Войти</h2>
    <form @submit.prevent="onSubmit">
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
          type="password"
          v-model="password"
          class="form-control"
          :class="[
            { 'is-invalid': incorrectPassword },
            !incorrectPassword && incorrectPassword !== null && 'is-valid'
          ]"
          id="exampleInputPassword1"
        />
      </div>

      <small
        class="d-block text-center my-3 text-danger"
        v-if="error == 'auth/argument-error'"
        >Корректно заполните обязательные поля</small
      >
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

      <button type="submit" class="btn btn-primary w-100 bg-gradient">
        Войти
      </button>
    </form>
    <router-link to="/registration" class="d-block text-center my-2"
      >или Регистрация</router-link
    >
  </div>
</template>

<script>
export default {
  name: "LoginForm",

  data() {
    return {
      email: null,
      incorrectEmail: false,
      password: null,
      incorrectPassword: false,
      error: null
    };
  },

  methods: {
    /**
     * Событие отправки формы авторизации
     * @param {}
     * @returns {void}
     */
    onSubmit() {
      // Объявление регулярных выражений
      let regEmail = new RegExp(
          /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i
        ),
        regPassword = new RegExp(/^[a-zA-Z0-9]/i);

      // Очистка ошибок
      this.error = null;
      this.incorrectEmail = null;
      this.incorrectPassword = null;

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

      if (!this.error) {
        const user = {
          email: this.email,
          password: this.password
        };

        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(error => {
            this.error = error.code;
          });
      }
    }
  }
};
</script>

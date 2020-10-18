<!-- Страница авторизации -->

<template>
  <div
    id="login-form"
    class="vh-100 d-flex align-items-end align-items-md-center justify-content-center form-page"
  >
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/Forms/LoginForm.vue";

export default {
  name: "Login",

  components: {
    LoginForm
  }
};
</script>

<style lang="scss">
.form-page {
  background: url("../assets/images/bg.png") no-repeat center center;
}
</style>

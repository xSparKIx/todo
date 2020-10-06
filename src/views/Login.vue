<!-- Страница авторизации -->

<template>
  <div
    id="login-form"
    class="vh-100 d-flex align-items-center justify-content-center"
  >
    <LoginForm />
  </div>
  <Shapes />
</template>

<script>
import LoginForm from "@/components/Forms/LoginForm.vue";
import Shapes from "@/components/Includes/Shapes.vue";

export default {
  name: "Login",

  components: {
    LoginForm,
    Shapes
  }
};
</script>

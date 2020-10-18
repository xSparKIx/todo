<template>
  <div
    id="reg-form"
    class="vh-100 d-flex align-items-end align-items-md-center justify-content-center form-page"
  >
    <RegistrationForm />
  </div>
</template>

<script>
import RegistrationForm from "@/components/Forms/RegistrationForm.vue";

export default {
  name: "Registration",

  components: {
    RegistrationForm
  }
};
</script>

<style lang="scss">
.form-page {
  background: url("../assets/images/bg.png") no-repeat center center;
}
</style>

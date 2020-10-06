<template>
  <div
    id="reg-form"
    class="vh-100 d-flex align-items-center justify-content-center"
  >
    <RegistrationForm />
  </div>
  <Shapes />
</template>

<script>
import RegistrationForm from "@/components/Forms/RegistrationForm.vue";
import Shapes from "@/components/Includes/Shapes.vue";

export default {
  name: "Registration",

  components: {
    RegistrationForm,
    Shapes
  }
};
</script>

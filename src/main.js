import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Bootstrap from "bootstrap";
import firebase from "./components/Includes/fireBaseConfig.js";

createApp(App)
  .use(store)
  .use(router)
  .use(firebase)
  .use(Bootstrap)
  .mount("#app");

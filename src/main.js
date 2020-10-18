import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "./config/fireBaseConfig.js";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

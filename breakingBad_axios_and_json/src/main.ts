import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";

import "./assets/main.css";

createApp(App).use(VueQueryPlugin).use(router).mount("#app");

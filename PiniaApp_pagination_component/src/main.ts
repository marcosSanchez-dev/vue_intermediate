import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import "./assets/main.css";
import { VueQueryPlugin } from "@tanstack/vue-query";
const pinia = createPinia();
const app = createApp(App);

VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 120,
        refetchOnReconnect: "always",
      },
    },
  },
});

app.use(pinia);
app.use(router);

app.mount("#app");

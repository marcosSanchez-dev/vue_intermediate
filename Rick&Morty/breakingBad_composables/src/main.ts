import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";

import "./assets/main.css";

// ! Solo fue necesario importar el store para que este fuera creado de forma global en la app
import "@/store/characters.store";

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

app.use(router).mount("#app");

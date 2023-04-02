import { createRouter, createWebHistory } from "vue-router";
import CounterOptionsPage from "@/counter/pages/CounterOptionsPage.vue";
import CounterSetupPage from "@/counter/pages/CounterSetupPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "counter-options",
      component: CounterOptionsPage,
    },
    {
      path: "/setup",
      name: "counter-setup",
      component: CounterSetupPage,
    },
  ],
});

export default router;

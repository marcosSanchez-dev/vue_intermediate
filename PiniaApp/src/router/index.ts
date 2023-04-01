import { createRouter, createWebHistory } from "vue-router";
import Counter1Page from "@/counter/pages/Counter1Page.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "counter-1",
      component: Counter1Page,
    },
  ],
});

export default router;

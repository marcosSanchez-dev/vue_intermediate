import AboutPage from "@/shared/pages/AboutPage.vue";
import HomePage from "@/shared/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

//! Lazy Load
const CharacterLayout = () => import("@/characters/layout/CharacterLayout.vue");

const routes = [
  //Public
  { path: "/", name: "home", component: HomePage },
  { path: "/about", name: "about", component: AboutPage },

  //Characters
  {
    path: "/characters",
    name: "characters",
    component: CharacterLayout,
  },

  //Default
  {
    path: "/:pathMatch(.*)*",
    redirect: () => ({
      name: "home",
    }),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

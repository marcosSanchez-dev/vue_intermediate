import AboutPage from "@/shared/pages/AboutPage.vue";
import HomePage from "@/shared/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { characterRoute } from "../characters/router/index";

//! Lazy Load
// const CharacterLayout = () => import("@/characters/layout/CharacterLayout.vue");

// ! Estas rutas se visualizaran en el <RouterView />

const routes = [
  //Public
  { path: "/", name: "home", component: HomePage },
  { path: "/about", name: "about", component: AboutPage },

  //Characters
  // ! SIN importar una ruta
  /*  
  {
    path: "/characters",
    name: "characters",
    component: CharacterLayout,
  },
*/

  // ! Importando una ruta

  characterRoute,

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
  //! routes tiene type de RouteRecordRaw
  routes,
});

// ! Otra opcion cuando importas una ruta
// router.addRoute(characterRoute);

export default router;

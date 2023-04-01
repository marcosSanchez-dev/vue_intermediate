import type { RouteRecordRaw } from "vue-router";
import CharacterLayout from "../layout/CharacterLayout.vue";
import CharacterId from "../pages/CharacterId.vue";
import CharacterList from "../pages/CharacterList.vue";
import CharacterSearch from "../pages/CharacterSearch.vue";

const NAME_ROUTE = "characters";
//! Estas rutas afectan al <RouterView /> de CharacterLayout

export const characterRoute: RouteRecordRaw = {
  path: `/${NAME_ROUTE}`,
  component: CharacterLayout,
  name: "characters",
  redirect: `/${NAME_ROUTE}/list`,
  children: [
    {
      // ':id' es un parametro que se usa a traves de la url
      // " by/ " cambia la URL de los otros links en el navbar y es un bug que se solventa agregando "/${NAME_ROUTE}/" a cada path
      path: "by/:id",
      name: "character-id",
      props: { visible: false, title: "Por ID" },
      component: CharacterId,
    },
    {
      path: `/${NAME_ROUTE}/list`,
      name: "character-list",
      props: { visible: true, title: "CharacterList Title with router props" },
      component: CharacterList,
    },
    {
      path: `/${NAME_ROUTE}/search`,
      name: "character-seacrh",
      props: { visible: true, title: "Busqueda" },
      component: CharacterSearch,
    },
  ],
};

import type { RouteRecordRaw } from "vue-router";
import CharacterLayout from "../layout/CharacterLayout.vue";
import CharacterId from "../pages/CharacterId.vue";
import CharacterList from "../pages/CharacterList.vue";
import CharacterSearch from "../pages/CharacterSearch.vue";

//! Estas rutas afectan al <RouterView /> de CharacterLayout

export const characterRoute: RouteRecordRaw = {
  path: "/characters",
  component: CharacterLayout,
  name: "characters",
  redirect: "/characters/list",
  children: [
    {
      path: "by/id",
      name: "character-id",
      props: { visible: false, title: "Por ID" },
      component: CharacterId,
    },
    {
      path: "list",
      name: "character-list",
      props: { visible: true, title: "CharacterList Title with router props" },
      component: CharacterList,
    },
    {
      path: "search",
      name: "character-seacrh",
      props: { visible: true, title: "Busqueda" },
      component: CharacterSearch,
    },
  ],
};

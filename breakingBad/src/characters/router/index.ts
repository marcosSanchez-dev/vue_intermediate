import type { RouteRecordRaw } from "vue-router";
import CharacterLayout from "../layout/CharacterLayout.vue";
import CharacterId from "../pages/CharacterId.vue";
import CharacterList from "../pages/CharacterList.vue";
import CharacterSearch from "../pages/CharacterSearch.vue";

export const characterRoute: RouteRecordRaw = {
  path: "/characters",
  component: CharacterLayout,
  name: "characters",
  redirect: "/characters/list",
  children: [
    {
      path: "by/id",
      name: "character-id",
      props: { title: "Por ID" },
      component: CharacterId,
    },
    {
      path: "list",
      name: "character-list",
      props: { title: "por Lista" },
      component: CharacterList,
    },
    {
      path: "search",
      name: "character-seacrh",
      props: { title: "Busqueda" },
      component: CharacterSearch,
    },
  ],
};

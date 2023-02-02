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
    { path: "by/id", name: "character-id", component: CharacterId },
    { path: "list", name: "character-list", component: CharacterList },
    { path: "search", name: "character-seacrh", component: CharacterSearch },
  ],
};

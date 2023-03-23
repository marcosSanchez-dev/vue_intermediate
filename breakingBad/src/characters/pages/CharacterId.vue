<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Character, Result } from "../interfaces/character";
import characterStore from "@/store/characters.store";
import breakingBadApi from "@/api/breakingBadApi";
import { useQuery } from "@tanstack/vue-query";

// ! nos da acceso a toda la informacion de la ruta
const route = useRoute();

// me interesa obtener el parametro "ID" que especifique en el router
const { id } = route.params as { id: string };
console.log("params: ", id);

const getCharacterCacheFirst = async (
  characterId: string
): Promise<Character> => {
  if (characterStore.checkIdInStore(characterId)) {
    return characterStore.ids.list[characterId];
  }

  const { data } = await breakingBadApi.get<Character>(
    `/character/${characterId}`
  );
  return data;
};

const { data } = useQuery(
  ["characters", id],
  () => getCharacterCacheFirst(id),
  {
    onSuccess(character) {
      characterStore.loadedCharacter(character);
    },
  }
);
</script>

<template>
  <div class="child-wrapper">
    <h1>CharacterId.vue {{ route.params.id }}</h1>
    <img :src="data?.image" alt="" srcset="" />
    <!-- <code>
      {{ data }}
    </code> -->
  </div>
</template>

<style scoped>
.child-wrapper {
  background: chocolate;
  padding: 5rem;
  color: white;
  min-width: max-content;
}
</style>

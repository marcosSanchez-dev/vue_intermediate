<script setup lang="ts">
import CardList from "@/characters/components/CardList.vue";
import { useQuery } from "@tanstack/vue-query";
import type { Character, Result } from "../interfaces/character";
import breakingBadApi from "@/api/breakingBadApi";
import characterStore from "@/store/characters.store";

const props = defineProps<{ visible: boolean; title: string }>();

// console.log("characterList props: ", props);

// 3- Tanstack query

const getCharactersCache = async (): Promise<Character[]> => {
  if (characterStore.characters.count > 0) {
    return characterStore.characters.list;
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { data } = await breakingBadApi.get<Result>("/character");
      resolve(data.results);
    }, 2000);
  });
};

const { data, isLoading } = useQuery(["characters"], getCharactersCache, {
  // 1. Lo que resuelva en mi funcion getCharactersCache() es lo que obtendra como parametro la funcion onSuccess()
  // 2. La "data" es de tipo Character[] ya que viene especificado el tipado en la funcion getCharactersCache()
  onSuccess(data) {
    characterStore.loadedCharacters(data);
  },
});
</script>

<template>
  <h1 v-if="characterStore.characters.isLoading" class="loading">
    Cargando...
  </h1>
  <h2 v-if="characterStore.characters.hasError">
    {{ characterStore.characters.errorMessage }}
  </h2>
  <template v-else>
    <div class="child-wrapper">
      <!-- ! Este prop viene de la URL y se especifican en el router -->
      <h1>{{ props.title || "no hay props.title" }}</h1>
      <CardList :characters="characterStore.characters.list" />
    </div>
  </template>
</template>

<style scoped>
.child-wrapper {
  border: 5px solid darkgreen;
  padding: 5rem;
  color: white;
  min-width: max-content;
}
</style>

<script setup lang="ts">
import breakingBadApi from "@/api/breakingBadApi";
// import { ref } from "vue";
import CharacterCard from "@/characters/components/CharacterCard.vue";
import type { Character, Result } from "../interfaces/character";

import { useQuery } from "@tanstack/vue-query";
// import { useCharacters } from "../composables/useCharacters";

// 1- Con suspense
// const { data } = await breakingBadApi.get<Result[]>("/character");
// const characters = ref<Character[]>(data.results);
const stringTest = "soy un composable function";

// 2- Composable function
// const { characters, isLoading, hasError, errorMessage } =
//   useCharacters(stringTest);

// 3- Tanstack query
const getCharactersSlow = async (): Promise<Character[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { data } = await breakingBadApi.get<Result>("/character");
      resolve(data.results);
    }, 2000);
  });
};

const {
  data: characters,
  isLoading,
  isError,
  error,
} = useQuery(["characters"], getCharactersSlow, {
  cacheTime: 1000 * 60,
  refetchOnReconnect: "always",
});
</script>

<template>
  <div class="card-list__wrapper">
    <h1 v-if="isLoading" class="loading">Cargando...</h1>
    <h2 v-if="isError">{{ error }}</h2>
    <div v-else>
      <h1>CardList</h1>
      <div class="card-list">
        <CharacterCard
          v-for="character of characters"
          :key="character.id"
          :character="character"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-list__wrapper {
  background: goldenrod;
}
.loading {
  background: fuchsia;
}

.card-lis {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>

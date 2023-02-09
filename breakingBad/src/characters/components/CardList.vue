<script setup lang="ts">
// import breakingBadApi from "@/api/breakingBadApi";
// import { ref } from "vue";
// import type { Character, Result } from "../interfaces/character";

import { useCharacters } from "../composables/useCharacters";

// ! Con suspense
// const { data } = await breakingBadApi.get<Result[]>("/character");
// const characters = ref<Character[]>(data.results);

const { characters, isLoading, hasError, errorMessage } = useCharacters();
</script>

<template>
  <div class="card-list__wrapper">
    <h1 v-if="isLoading" class="loading">Cargando...</h1>
    <h2 v-if="hasError">{{ errorMessage }}</h2>
    <div v-else>
      <h1>CardList</h1>
      <ul>
        <li v-for="{ id, name } of characters" :key="id">
          {{ name }}
        </li>
      </ul>
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
</style>

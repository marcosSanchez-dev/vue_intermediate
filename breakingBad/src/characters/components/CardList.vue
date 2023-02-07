<script setup lang="ts">
import breakingBadApi from "@/api/breakingBadApi";
import { ref } from "vue";
import type { Character, Result } from "../interfaces/character";

// ! Con suspense
// const { data } = await breakingBadApi.get<Result[]>("/character");
// const characters = ref<Character[]>(data.results);

//! Sin suspense

const characters = ref<Character[]>([]);
breakingBadApi.get<Result>("/character").then((response) => {
  characters.value = response.data.results;
});
</script>

<template>
  <div class="card-list__wrapper">
    <h1>CardList</h1>
    <ul>
      <li v-for="{ id, name } of characters" :key="id">
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.card-list__wrapper {
  background: goldenrod;
}
</style>

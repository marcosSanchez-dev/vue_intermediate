<script setup lang="ts">
import CharacterCard from "@/characters/components/CharacterCard.vue";
import type { Character } from "../interfaces/character";
// import breakingBadApi from "@/api/breakingBadApi";
// import type { Character, Result } from "../interfaces/character";
// import { useQuery } from "@tanstack/vue-query";
// import { ref } from "vue";

// import { useCharacters } from "../composables/useCharacters";

// 1- Con suspense
// const { data } = await breakingBadApi.get<Result[]>("/character");
// const characters = ref<Character[]>(data.results);

// 2- Composable function
// const { characters, isLoading, hasError, errorMessage } =
//   useCharacters(stringTest);

const props = defineProps<{ characters: Character[] }>();
</script>

<template>
  <div class="card-list__wrapper">
    <div>
      <h1>CardList</h1>
      <div class="card-list">
        <CharacterCard
          v-for="character of props.characters"
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

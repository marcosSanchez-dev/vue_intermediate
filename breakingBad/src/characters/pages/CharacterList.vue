<script setup lang="ts">
import CardList from "@/characters/components/CardList.vue";
import { useQuery } from "@tanstack/vue-query";
import type { Character, Result } from "../interfaces/character";
import breakingBadApi from "@/api/breakingBadApi";

const props = defineProps<{ visible: boolean; title: string }>();

// console.log("characterList props: ", props);

// 3- Tanstack query
const getCharactersSlow = async (): Promise<Character[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { data } = await breakingBadApi.get<Result>("/character");
      resolve(
        data.results.filter((personaje) => ![3, 4, 7].includes(personaje.id))
      );
    }, 2000);
  });
};

const {
  data: characters,
  isLoading,
  isError,
  error,
} = useQuery(["characters"], getCharactersSlow);
</script>

<template>
  <h1 v-if="isLoading" class="loading">Cargando...</h1>
  <h2 v-if="isError">{{ error }}</h2>
  <template v-else>
    <div class="child-wrapper">
      <!-- ! Este prop viene de la URL y se especifican en el router -->
      <h1>{{ props.title || "no hay props.title" }}</h1>
      <CardList :characters="characters || []" />
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

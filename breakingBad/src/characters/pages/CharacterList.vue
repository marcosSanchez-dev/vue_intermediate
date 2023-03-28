<script setup lang="ts">
import CardList from "@/characters/components/CardList.vue";
import useCharacters from "../composables/useCharacters";

const props = defineProps<{ visible: boolean; title: string }>();

const { characters, isLoading, hasError, errorMessage, count } =
  useCharacters();
</script>

<template>
  <h1 v-if="isLoading" class="loading">Cargando...</h1>
  <h2 v-else-if="hasError">
    {{ errorMessage }}
  </h2>
  <template v-else>
    <div class="child-wrapper">
      <!-- ! Este prop viene de la URL y se especifican en el router -->
      <h1>{{ props.title || "no hay props.title" }} - ({{ count }})</h1>
      <CardList :characters="characters" />
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

h2 {
  color: red;
  font-size: 3rem;
}
</style>

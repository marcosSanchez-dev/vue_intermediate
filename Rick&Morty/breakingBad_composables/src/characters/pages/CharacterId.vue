<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import useCharacter from "../composables/useCharacter";
import { watchEffect } from "vue";

// ! nos da acceso a toda la informacion de la ruta
const route = useRoute();
// ! nos da acceso a todal router que creamos
const router = useRouter();

// me interesa obtener el parametro "ID" que especifique en el router
//  el poner " as { id: string } " es lo mismo a " route.params.id "
const { id } = route.params as { id: string };

const { list, hasError, errorMessage, character, isLoading } = useCharacter(id);

// Esta pendiente de los cambios de todas las propiedades reactivas
watchEffect(() => {
  console.log("isLoading: ", isLoading.value);
  console.log("hasError: ", hasError.value);
  if (!isLoading.value && hasError.value) {
    router.replace("/characters");
  }
});
</script>

<template>
  <h1 v-if="isLoading">Loading...</h1>
  <h1 v-else-if="hasError">{{ errorMessage }}</h1>

  <div class="child-wrapper" v-else-if="character">
    <h1>CharacterId.vue {{ route.params.id }}</h1>
    <div class="character-container">
      <img :src="character?.image" :alt="character.name" srcset="" />
      <ul>
        <li>Nombre: {{ character.name }}</li>
        <li>Especie: {{ character.species }}</li>
        <li>Genero: {{ character.gender }}</li>
      </ul>
    </div>
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

.character-container {
  display: flex;
  flex-direction: row;
}
img {
  width: 100px;
  border-radius: 5px;
}
</style>

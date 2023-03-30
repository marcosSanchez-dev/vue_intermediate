<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Character, Result } from "../interfaces/character";
import characterStore from "@/store/characters.store";
import breakingBadApi from "@/api/breakingBadApi";
import { useQuery } from "@tanstack/vue-query";

// ! nos da acceso a toda la informacion de la ruta
const route = useRoute();

// me interesa obtener el parametro "ID" que especifique en el router
// ! el poner " as { id: string } " es lo mismo a " route.params.id "
const { id } = route.params as { id: string };
</script>

<template>
  <h1 v-if="!character">Loading...</h1>

  <div class="child-wrapper" v-else>
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

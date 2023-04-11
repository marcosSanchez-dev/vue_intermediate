<script setup lang="ts">
// * mandamos a imprimir la variable de entorno:
// console.log(import.meta.env);

import type { Client } from "../interfaces/client";

const props = defineProps<{ clients: Client[] }>();
</script>

<template>
  <h3>ClientList.vue</h3>
  <ul>
    <li v-for="client in props.clients" :key="client.id">
      <!-- * De esta manera podemos mandarle un parametro desde nuestro link hacia el router -->
      <RouterLink :to="{ name: 'client-id', params: { id: client.id } }">
        {{ client.name }}</RouterLink
      >
    </li>
  </ul>
</template>

<style scoped></style>

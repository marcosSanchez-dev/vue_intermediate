<script setup lang="ts">
// * mandamos a imprimir la variable de entorno:
// console.log(import.meta.env);

import { useClientsStore } from "@/store/clients";
import useClients from "../composables/useClients";
import { onMounted } from "vue";

const { clients, isLoading } = useClients();

// al cargarse este componente el valor de "clients" es undefined
// console.log(clients.value);
</script>

<template>
  <h3>ClientList.vue</h3>
  <ul>
    <li v-for="client in clients" :key="client.id">
      <!-- * De esta manera podemos mandarle un parametro desde nuestro link hacia el router -->
      <RouterLink :to="{ name: 'client-id', params: { id: client.id } }">
        {{ client.name }}</RouterLink
      >
    </li>
  </ul>
</template>

<style scoped></style>

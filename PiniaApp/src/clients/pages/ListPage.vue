<script setup lang="ts">
import ClientList from "@/clients/components/ClientList.vue";
import PaginationNumbers from "../components/PaginationNumbers.vue";
</script>

<template>
  <h2>ListPage.vue</h2>
  <!-- Lista de clientes -->
  <ClientList />
  <!-- Paginacion -->
  <PaginationNumbers />
  <!-- Modal de cargando -->
</template>

<style scoped></style>

<script setup lang="ts">
import ClientList from "@/clients/components/ClientList.vue";
import PaginationNumbers from "../components/PaginationNumbers.vue";
import useClients from "../composables/useClients";
import LoadingModal from "../../shared/components/LoadingModal.vue";

const { isLoading, clients, currentPage, totalPages, getPage } = useClients();
</script>

<template>
  <h2>ListPage.vue</h2>
  <!-- Lista de clientes -->
  <ClientList :clients="clients" />

  <!-- Paginacion -->
  <PaginationNumbers
    :total-pages="totalPages"
    :current-page="currentPage"
    @page-changed="getPage"
  />

  <!-- Modal de cargando -->
  <LoadingModal v-if="isLoading" />
</template>

<style scoped></style>

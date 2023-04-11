<script setup lang="ts">
import LoadingModal from "@/shared/components/LoadingModal.vue";
import useClient from "@/clients/composables/useClient";
import { useRoute } from "vue-router";

const route = useRoute();

const { client, isLoading } = useClient(+route.params.id);
</script>
<template>
  <h2>ClientPage.vue</h2>
  <h3>Guardando...</h3>
  <h3>Guardado</h3>

  <LoadingModal v-if="isLoading" />

  <div>
    <h1>Nombre</h1>
    <form action="">
      <input type="text" placeholder="Nombre del cliente" />
      <br />
      <input type="text" placeholder="Direccion del cliente" />
      <br />
      <button type="submit">Guardar</button>
    </form>
  </div>

  <code> {{ client }} </code>
</template>

<style scoped>
input {
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 10px;
}

button {
  margin-bottom: 10px;
}
</style>

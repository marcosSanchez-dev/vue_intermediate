<script setup lang="ts">
import LoadingModal from "@/shared/components/LoadingModal.vue";
import useClient from "@/clients/composables/useClient";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";

const route = useRoute();
const router = useRouter();

const {
  client,
  isLoading,
  isError,
  updateClientPatch,
  isSuccess,
  mutate,
  mutationIsLoading,
  reset,
  status,
} = useClient(+route.params.id);

watch(
  isSuccess,
  () => {
    setTimeout(() => {
      // ! Inicializa la variable isSuccess, isLoading, status, etc...
      reset();
    }, 2000);
  },
  {
    immediate: true,
  }
);

watch(
  isError,
  () => {
    if (isError.value) {
      console.log("hay error con el useQuery!");

      // ! replace te redirecciona a nueva pantalla sin guardar en el historial el link anterior
      router.replace("/clients");
    }
  },
  { immediate: true }
);
</script>
<template>
  <h2>ClientPage.vue</h2>
  <h1>isSuccess: {{ isSuccess }}</h1>
  <h1>mutationIsLoading: {{ mutationIsLoading }}</h1>
  <h1>mutationIsUpdating: {{ mutationIsUpdating }}</h1>
  <h1>isError: {{ isError }}</h1>
  <h1>status: {{ status }}</h1>
  <h3 v-if="mutationIsLoading"><b> Guardando... </b></h3>
  <h3 v-if="isSuccess"><b> Guardado :) </b></h3>

  <LoadingModal v-if="isLoading || mutationIsLoading" />

  <div v-if="client">
    <h1>{{ client.name }}</h1>

    <!-- ! "mutate() llama a la funcion que se le paso como parametro a "useMutation" -->
    <form @submit.prevent="mutate(client!)">
      <!-- ! el v-model tendrá efecto solo si "client" es una variable reactiva y con el permiso de ser editada y no solo "read only", por eso se rompe la referencia en el composable usando spread operator -->
      <input
        type="text"
        placeholder="Nombre del cliente"
        v-model="client.name"
      />
      <br />
      <input
        type="text"
        placeholder="Direccion del cliente"
        v-model="client.address"
      />
      <br />
      <button type="submit" :disabled="mutationIsLoading">Guardar</button>
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

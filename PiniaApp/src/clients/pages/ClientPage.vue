<script setup lang="ts">
import LoadingModal from "@/shared/components/LoadingModal.vue";
import useClient from "@/clients/composables/useClient";
import { useRoute, useRouter } from "vue-router";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Client } from "../interfaces/client";
import clientsApi from "@/api/clients-api";
import { watch } from "vue";

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();

const { client, isLoading, isError } = useClient(+route.params.id);

// * "cliente" es la data que voy a mandar para actualizar la data
const updateClientPatch = async (cliente: Client): Promise<Client> => {
  console.log("Se disparo el metodo patch para actualizar clientes");
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { data } = await clientsApi.patch<Client>(
        `/clients/${cliente.id}`,
        cliente
      );

      // ! con queryClient tengo acceso a la instancia QueryCache que es donde se almacenan los resultado de los query.
      const queries = queryClient
        .getQueryCache()
        .findAll(["clients?page="], { exact: false });
      console.log("queries: ", queries);

      // Ejemplo de como resetar queries
      // queries.forEach((query) => query.reset());

      // con el siguiente bloque pido hacer un refetch a la query con nombre "clients?page=" despues de haber ejecutado el metodo PATCH
      queries.forEach((query) => query.fetch());

      // console.log(data);
      resolve(data);
    }, 2000);
  });
};

const {
  mutate,
  isLoading: mutationIsLoading,
  isSuccess,
  reset,
  status,
} = useMutation(updateClientPatch, {
  // * La "data" que le paso como parametro, la mando desde el  "resolve(data)"
  onSuccess(data) {
    // console.log("data: ", data);
  },
});

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

console.log("isError: ", isError.value);
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

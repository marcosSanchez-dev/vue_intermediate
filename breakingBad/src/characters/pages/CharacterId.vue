<script setup lang="ts">
import { useRoute } from "vue-router";

// ! nos da acceso a toda la informacion de la ruta
const route = useRoute();

// me interesa obtener el parametro "ID" que especifique en el router
const { id } = route.params as { id: string };
console.log("params: ", id);
</script>

<template>
  <div class="child-wrapper">
    <h1>CharacterId.vue {{ route.params.id }}</h1>
  </div>
</template>

<style scoped>
.child-wrapper {
  background: chocolate;
  padding: 5rem;
  color: white;
  min-width: max-content;
}
</style>

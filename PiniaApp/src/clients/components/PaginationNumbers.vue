<script setup lang="ts">
import useClients from "../composables/useClients";

const { getPage, totalPagesArray, currentPage, totalPages } = useClients();
</script>

<template>
  <div>
    <button :disabled="currentPage == 1" @click="getPage(currentPage - 1)">
      Anterior
    </button>
    <button
      v-for="number of totalPagesArray"
      :key="number"
      @click="getPage(number)"
      :class="{ active: currentPage == number }"
    >
      {{ number }}
    </button>
    <button
      :disabled="currentPage == totalPages"
      @click="getPage(currentPage + 1)"
    >
      Siguiente
    </button>
  </div>
</template>

<style scoped>
div {
  margin-top: 15px;
}

button {
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  margin-right: 5px;
  padding: 10px;
  transition: all 0.5s;
}

button:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
  transition: all 0.5s;
}
button:disabled {
  cursor: not-allowed;
}

.active {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>

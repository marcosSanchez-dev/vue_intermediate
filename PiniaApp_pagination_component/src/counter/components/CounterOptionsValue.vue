<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterOptionsStore } from "../../store/counter-options";

const counterStore = useCounterOptionsStore();
const { count, lastChanged } = storeToRefs(counterStore);
</script>

<template>
  <div style="margin-top: 20px">
    <h3>El valor es: {{ count }}</h3>
    <h3>Ultimo cambio fue en: {{ lastChanged }}</h3>
  </div>
</template>

<style scoped></style>

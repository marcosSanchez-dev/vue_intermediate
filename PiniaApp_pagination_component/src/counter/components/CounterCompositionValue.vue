<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterSetupStore } from "@/store/counter-setup";

const counterSetupStore = useCounterSetupStore();
const { count, lastChange } = storeToRefs(counterSetupStore);
</script>

<template>
  <div style="margin-top: 20px">
    <h3>El valor es: {{ count }}</h3>
    <h3>Ultimo cambio fue en: {{ lastChange }}</h3>
  </div>
</template>

<style scoped></style>

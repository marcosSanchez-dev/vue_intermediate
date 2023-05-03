<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterSetupStore } from "@/store/counter-setup";
import CounterCompositionValue from "../components/CounterCompositionValue.vue";

const counterSetupStore = useCounterSetupStore();
// para desestructurar getters y state del store hay que usar el storeToRefs()
const { count, squareCount } = storeToRefs(counterSetupStore);
const { incrementByOne, incrementBy } = counterSetupStore;
</script>

<template>
  <div>
    <h1>Pinia Setup</h1>
    <h3>Counter: {{ count }}</h3>
    <h3>Square: {{ squareCount }}</h3>
  </div>

  <br />

  <div>
    <button @click="incrementByOne">+1</button>
    <button @click="incrementBy(2)">+2</button>
    <button @click="incrementBy(5)">+5</button>

    <!-- * Las funciones que son nativas de pinia es mejor llamarlas sin destructuracion -->
    <button @click="counterSetupStore.$reset" disabled>
      No funciona el reset, en setup
    </button>
  </div>

  <br />

  <CounterCompositionValue />
</template>

<style scoped>
button {
  min-width: fit-content;
  margin-right: 10px;
  cursor: pointer;
}
</style>

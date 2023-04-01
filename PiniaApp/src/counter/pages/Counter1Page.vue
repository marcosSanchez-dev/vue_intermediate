<script setup lang="ts">
import { useCounterOptionsStore } from "@/store/counter-options";
import { storeToRefs } from "pinia";
import CounterOptionsValue from "../components/CounterOptionsValue.vue";

const counterOptionsStore = useCounterOptionsStore();
// para desestructurar getters y state del store hay que usar el storeToRefs()
const { count, squareCount } = storeToRefs(counterOptionsStore);
const { incrementByOne, incrementBy } = counterOptionsStore;
</script>

<template>
  <div>
    <h1>Pinia Options</h1>
    <h3>Counter: {{ count }}</h3>
    <h3>Square: {{ squareCount }}</h3>
  </div>

  <br />

  <div>
    <button @click="incrementByOne">+1</button>
    <button @click="incrementBy(2)">+2</button>
    <button @click="incrementBy(5)">+5</button>
    <button @click="counterOptionsStore.$reset">reset</button>
  </div>

  <br />

  <CounterOptionsValue />
</template>

<style scoped>
button {
  min-width: fit-content;
  margin-right: 10px;
  cursor: pointer;
}
</style>

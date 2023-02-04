<script setup lang="ts">
import breakingBadApi from "@/api/breakingBadApi";

breakingBadApi.get("/character").then((response) => {
  console.log("response: ", { data: response.data.results });
});
</script>

<template>
  <h1>CardList</h1>
  <ul>
    <li>Hola</li>
    <li>Hola</li>
    <li>Hola</li>
  </ul>
</template>

<style scoped></style>

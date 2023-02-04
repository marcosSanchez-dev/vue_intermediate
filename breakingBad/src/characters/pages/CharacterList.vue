<script setup lang="ts">
import CardList from "@/characters/components/CardList.vue";

const props = defineProps<{ visible: boolean; title: string }>();

// console.log("characterList props: ", props);
</script>

<template>
  <div class="child-wrapper">
    <h1>{{ props.title || "no hay props.title" }}</h1>
    <CardList />
  </div>
</template>

<style scoped>
.child-wrapper {
  border: 5px solid darkgreen;
  padding: 5rem;
  color: white;
  min-width: max-content;
}
</style>

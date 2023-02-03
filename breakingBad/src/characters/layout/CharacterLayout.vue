<script setup lang="ts">
import NavBar from "@/shared/components/NavBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="layout-wrapper">
    <h1>CharacterLayout.vue</h1>

    <!-- navBar -->
    <NavBar :show-icon="false" />
    <!-- routerView + suspense -->
    <RouterView />
  </div>
</template>

<style scoped>
.layout-wrapper {
  background: deeppink;
  padding: 25%;
  color: white;
  text-align: center;
}
</style>

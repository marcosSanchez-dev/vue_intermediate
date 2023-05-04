<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinnner from 'src/shared/components/LoaderSpinnner.vue';
import IssueCard from '../components/issue-list/IssueCard.vue';

const route = useRoute();
// console.log('route: ', route.params);

// * como valor predeterminado le mando un string vacio
const { id = '' } = route.params;
</script>

<template>
  <div>
    <span class="text-h2">IssuePage: {{ id }}</span>
  </div>
  <LoaderSpinnner color="green" />

  <router-link class="text-white" to="/">go back!</router-link>

  <!-- * Header -->
  <IssueCard />

  <!-- * Comentarios -->
  <LoaderSpinnner color="white" :thickness="1" size="1rem" :show-text="false" />

  <div class="column">
    <span class="text-h3 q-mb-md">comments (5)</span>
    <IssueCard v-for="comments in 10" :key="comments" />
  </div>
</template>

<style scoped></style>

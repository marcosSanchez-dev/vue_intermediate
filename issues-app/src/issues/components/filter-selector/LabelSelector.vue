<script setup lang="ts">
import LoaderSpinnner from 'src/shared/components/LoaderSpinnner.vue';
import useLabels from '../../composables/useLabels';

const { labelsQuery } = useLabels();
</script>

<template>
  <LoaderSpinnner size="50px" :thickness="1" :show-text="false" />

  <q-chip v-for="label of 10" :key="label" color="primary" outline clickable>
    Algun nombre
  </q-chip>
</template>

<style scoped></style>

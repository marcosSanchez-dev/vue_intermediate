<script setup lang="ts">
import LoaderSpinnner from 'src/shared/components/LoaderSpinnner.vue';
import useLabels from '../../composables/useLabels';

const { labelsQuery, isLoading, toggleLabel, labelsClicked } = useLabels();
</script>

<template>
  <div class="q-mt-md">
    <LoaderSpinnner
      size="50px"
      :thickness="1"
      :show-text="false"
      v-if="isLoading"
    />

    <q-chip
      v-for="label of labelsQuery"
      :key="label.id"
      :style="{ color: `#${label.color}` }"
      :outline="!labelsClicked.includes(label.name)"
      clickable
      v-else
      @click="toggleLabel(label.name)"
    >
      {{ label.name }}
    </q-chip>
  </div>
</template>

<style scoped></style>

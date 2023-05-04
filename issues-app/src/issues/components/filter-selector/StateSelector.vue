<script setup lang="ts">
import { env } from 'process';
import { useIssuesStore } from '../../../stores/issues';

const issuesStore = useIssuesStore();

// ! como acceder a las env variables
// console.log('process.env: ', process.env);
</script>

<template>
  <div>
    <q-btn-toggle
      v-model="issuesStore.state"
      push
      spread
      glossy
      toggle-color="primary"
      :options="[
        { label: 'All', value: '' },
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ]"
    />
  </div>
</template>

<style scoped></style>

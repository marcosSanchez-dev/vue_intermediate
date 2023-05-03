<script setup lang="ts">
import { ref } from 'vue';

const model = ref('');
</script>

<template>
  <div>
    <q-btn-toggle
      v-model="model"
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

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useIssuesStore = defineStore('issues', () => {
  // const count = ref(0);

  const state = ref('');
  const label = ref<string[]>([]);

  return {
    // * state
    state,
    label,
    // * getters
    // squareCount: computed(() => count.value * count.value),

    // * actions
    toggleLabel(labelName: string) {
      console.log();
    },
  };
});

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useIssuesStore = defineStore('issues', () => {
  // const count = ref(0);

  const state = ref('');
  const labels = ref<string[]>([]);

  return {
    // * state
    state,
    labels,
    // * getters
    // squareCount: computed(() => count.value * count.value),

    // * actions
    toggleLabel(labelName: string) {
      if (labels.value.includes(labelName)) {
        labels.value = labels.value.filter((label) => label !== labelName);
        return;
      }

      labels.value.push(labelName);
    },
  };
});

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Client } from "@/clients/interfaces/client";

export const useClientsStore = defineStore("clients", () => {
  const currentPage = ref(1);
  const totalPages = ref(5);
  const clients = ref<Client[]>([]);

  return {
    // * state
    currentPage,
    totalPages,
    clients,
    // * getters
    // squareCount: computed(() => currentPage.value * currentPage.value),

    // * actions

    setClients(newClients: Client[]) {
      clients.value = newClients;
    },

    setPage(page: number) {
      if (currentPage.value === page) return;
      if (page <= 0) return;
      currentPage.value = page;
    },
  };
});

import clientsApi from "@/api/clients-api";
import type { Client } from "@/clients/interfaces/client";
import { useClientsStore } from "@/store/clients";
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";

const getClients = async (): Promise<Client[]> => {
  const { data } = await clientsApi.get("/clients?_page=1");
  return data;
};

const useClients = () => {
  const store = useClientsStore();

  const { clients, currentPage, totalPages } = storeToRefs(store);

  // * Lo que hay entre [] es el nombre que le asignaremos al cache
  // * La funcion se decalara como funcion de flecha porque espera recibir un argumento
  const { isLoading, data } = useQuery(["clients?page=", 1], () =>
    getClients()
  );

  watch(data, (clientes, oldValue) => {
    if (clientes) {
      store.setClients(clientes);
    }
  });

  // es lo mismo a decir "clients:clients"
  return {
    clients,
    isLoading,
    currentPage,
    totalPages,

    // * methods
    getPage: store.setPage,

    // * getters
    totalPagesArray: computed(() =>
      [...new Array(totalPages.value)].map((value, index) => index + 1)
    ),
  };
};

export default useClients;

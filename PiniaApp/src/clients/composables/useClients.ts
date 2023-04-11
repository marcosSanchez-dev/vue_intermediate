import clientsApi from "@/api/clients-api";
import type { Client } from "@/clients/interfaces/client";
import { useClientsStore } from "@/store/clients";
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

const getClients = (page: number): Promise<Client[]> => {
  console.log("Se dispara la request para la lista de clienteS");
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { data } = await clientsApi.get(`/clients?_page=${page}`);
      resolve(data);
    }, 2000);
  });
};

const useClients = () => {
  const store = useClientsStore();

  const { clients, currentPage, totalPages } = storeToRefs(store);

  // * Lo que hay entre [] es el nombre que le asignaremos al cache
  // * La funcion se decalara como funcion de flecha porque espera recibir un argumento
  // * "currentPage" va sin .value dentro del use Query ya que este desenvuelve la variable reactiva por si solo
  // ! useQuery es capaz de detectar cuando la variable reactiva (currentPage) cambie, y a causa de ello ejecuta de nuevo la funcion "getClients"
  const { isLoading, data } = useQuery(
    ["clients?page=", currentPage],
    () => getClients(currentPage.value),
    // ! staleTime evita hacer mas peticiones al cache para traer la info guardada, haciendo persistente la informacion por más tiempo
    {
      staleTime: 1000 * 60,
    }
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
    getPage(page: number) {
      store.setPage(page);
    },
    // * getters
    arrayOfTotalPages: computed(() =>
      [...new Array(totalPages.value)].map((value, index) => index + 1)
    ),
  };
};

export default useClients;

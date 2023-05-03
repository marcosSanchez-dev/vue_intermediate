import { ref, watch } from "vue";
import type { Client } from "@/clients/interfaces/client";
import { useMutation, useQuery } from "@tanstack/vue-query";
import clientsApi from "@/api/clients-api";

// const queryClient = useQueryClient();

const getClientRequest = async (id: number): Promise<Client> => {
  // console.log("Se dispara la request para traer 1 cliente");
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      // ! Cuando retornas una promesa hay que manejar la respuesta en caso de exito con "resolve", y en el caso de error con "reject"
      try {
        const { data } = await clientsApi.get(`/clients/${id}`);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
};

// * "cliente" es la data que voy a mandar para actualizar la data
// ! No puedo usar el hook de queryClient dentro del composable function. Debería mandar esta funcion al <script setup> del componente
const updateClientPatch = async (cliente: Client): Promise<Client> => {
  console.log("Se disparo el metodo patch para actualizar clientes");
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const { data } = await clientsApi.patch<Client>(
        `/clients/${cliente.id}`,
        cliente
      );

      // ! con queryClient tengo acceso a la instancia QueryCache que es donde se almacenan los resultado de los query.
      /*
      const queries = queryClient
        .getQueryCache()
        .findAll(["clients?page="], { exact: false });
      console.log("queries: ", queries);

      //*   Ejemplo de como resetar queries
      //* queries.forEach((query) => query.reset());

      //* con el siguiente bloque pido hacer un refetch a la query con nombre "clients?page=" despues de haber ejecutado el metodo PATCH
      queries.forEach((query) => query.fetch());
      */

      // console.log(data);
      try {
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
};

// * HOOK
const useClient = (id: number) => {
  const client = ref<Client>();
  const {
    mutate,
    isLoading: mutationIsLoading,
    isSuccess,
    reset,
    status,

    // ! si quisiera mover la funcion updateClientPatch al script del componente, me debo llevar tambien el UseMutation. Ejemplo en archivo ClientPage_QueryClient
  } = useMutation(updateClientPatch, {
    // * La "data" que le paso como parametro, la mando desde el  "resolve(data)"
    onSuccess(data) {
      // console.log("data: ", data);
    },
  });

  const { data, isLoading, isError } = useQuery(
    ["client", id],
    () => getClientRequest(id),

    //evita que se vuelva a hacer peticiones en caso de error
    {
      retry: false,
      // onError(error: any) {
      //   console.log("error: ", error);
      // },
    }
  );

  watch(
    data,
    (newVal, oldVal) => {
      // console.log({ newVal });
      // console.log({ oldVal });
      if (data.value) {
        // ! al usar el spread operator rompes las referencias entre ambos objetos. Al hacer "client.value = data.value" estas clonando practicamente el mismo objeto. Al usar el spread operator haces una separacion entre las dos variables y sus referencias
        client.value = { ...data.value };
      }
    },
    {
      immediate: true,
    }
  );

  return {
    isLoading,
    client,
    isError,
    updateClientPatch,
    mutate,
    mutationIsLoading,
    isSuccess,
    reset,
    status,

    //Getters
    // mutationIsUpdating: computed(() => mutationIsLoading),
  };
};

export default useClient;

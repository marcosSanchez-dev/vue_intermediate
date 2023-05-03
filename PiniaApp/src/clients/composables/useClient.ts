import { ref, watch } from "vue";
import type { Client } from "@/clients/interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import clientsApi from "@/api/clients-api";

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

const useClient = (id: number) => {
  const client = ref<Client>();

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

  return { isLoading, client, isError };
};

export default useClient;

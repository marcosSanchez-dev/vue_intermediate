import { ref, watch } from "vue";
import type { Client } from "@/clients/interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import clientsApi from "@/api/clients-api";

const getClientRequest = async (id: number): Promise<Client> => {
  console.log("Se dispara la request para traer 1 cliente");
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { data } = await clientsApi.get(`/clients/${id}`);
      resolve(data);
    }, 2000);
  });
};

const useClient = (id: number) => {
  const client = ref<Client>();

  const { data, isLoading } = useQuery(["client", id], () =>
    getClientRequest(id)
  );

  watch(
    data,
    (newVal, oldVal) => {
      console.log({ newVal });
      console.log({ oldVal });
      if (data.value) {
        // ! al usar el spread operator rompes las referencias entre ambos objetos. Al hacer "client.value = data.value" estas clonando practicamente el mismo objeto. Al usar el spread operator haces una separacion entre las dos variables y sus referencias
        client.value = { ...data.value };
      }
    },
    {
      immediate: true,
    }
  );

  return { isLoading, client };
};

export default useClient;

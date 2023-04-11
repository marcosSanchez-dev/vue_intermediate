import { ref, watch } from "vue";
import type { Client } from "@/clients/interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import clientsApi from "@/api/clients-api";

const getClient = async (id: number): Promise<Client> => {
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

  const { data, isLoading } = useQuery(["client", id], () => getClient(id));

  watch(
    data,
    () => {
      if (data.value) {
        client.value = data.value;
      }
    },
    {
      immediate: true,
    }
  );

  return { isLoading, client };
};

export default useClient;

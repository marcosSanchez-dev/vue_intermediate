import { computed, ref } from "vue";
import type { Character, Result } from "@/characters/interfaces/character";
import breakingBadApi from "@/api/breakingBadApi";
import { useQuery } from "@tanstack/vue-query";
import characterStore from "@/store/characters.store";

const characters = ref<Character[]>([]);
const hasError = ref(false);
const errorMessage = ref<string | null>(null);

// ! ": Promise<Character[]>" regresa una promesa de tipo "Character[]"
const getCharacters = async (): Promise<Character[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      if (characterStore.characters.list.length > 0) {
        resolve(characterStore.characters.list);
        return;
      }
      const { data } = await breakingBadApi.get<Result>("/character");
      resolve(data.results);
    }, 2000);
  });
};

const loadedCharacters = (data: Character[]) => {
  hasError.value = false;
  errorMessage.value = null;
  characters.value = data;
};

const useCharacters = () => {
  const { data, isLoading } = useQuery(["characters"], getCharacters, {
    /*
    Es lo mismo a escribir:

     onSuccess(data) {
      loadedCharacters(data);
    }
    */
    onSuccess: loadedCharacters,
    onError(error) {
      console.log("error: " + error);
    },
  });

  return {
    //properties
    characters,
    isLoading,
    hasError,
    errorMessage,
    //getters
    count: computed(() => characters.value.length),
    //methods
  };
};

export default useCharacters;

import breakingBadApi from "@/api/breakingBadApi";
import axios from "axios";
import { ref, onMounted } from "vue";
import type { Character, Result } from "../interfaces/character";

const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>("");

export const useCharacters = () => {
  // console.log("entre a useCharacters");
  onMounted(async () => await loadCharacters());

  const loadCharacters = async () => {
    // console.log("entre al async");
    if (characters.value.length > 0) return;

    isLoading.value = true;

    try {
      const { data } = await breakingBadApi.get<Result>("/character");
      characters.value = data.results;
      isLoading.value = false;
    } catch (error) {
      hasError.value = true;
      isLoading.value = false;

      if (axios.isAxiosError(error)) {
        errorMessage.value = error.message;
        return;
      }

      errorMessage.value = JSON.stringify(error);
    }
  };

  /*
  if (characters.value.length === 0) {
    //! Sin suspense

    breakingBadApi.get<Result>("/character").then((response) => {
      characters.value = response.data.results;
      isLoading.value = false;
    });
  }
  */

  // console.log("Hola mundo");

  return { characters, isLoading, hasError, errorMessage };
};

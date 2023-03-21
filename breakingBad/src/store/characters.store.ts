import breakingBadApi from "@/api/breakingBadApi";
import type { Character, Result } from "@/characters/interfaces/character";
import axios from "axios";
import { reactive } from "vue";

interface Store {
  characters: {
    list: Character[];
    count: number;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
  };

  //Metodos

  //! Estoy declarando este metodo y le indico a TS que no me regresa nada
  startLoadingCharacters: () => void;
  loadedCharacters: (data: Character[]) => void;
  loadCharactersFailed: (error: string) => void;
}

//* Initial State
const characterStore = reactive<Store>({
  characters: {
    list: [],
    count: 0,
    isLoading: true,
    hasError: false,
    errorMessage: null,
  },

  //Metodos
  async startLoadingCharacters() {
    try {
      const { data } = await breakingBadApi.get<Result>("/character");
      this.loadedCharacters(data.results);
    } catch (error) {
      this.loadCharactersFailed(error);
    }
  },
  loadedCharacters(data) {
    const filteredCharacters = data.filter(
      (personaje) => ![3, 4, 7].includes(personaje.id)
    );
    this.characters = {
      list: filteredCharacters,
      count: filteredCharacters.length,
      isLoading: false,
      hasError: false,
      errorMessage: null,
    };
  },
  loadCharactersFailed(error) {
    if (axios.isAxiosError(error)) {
      console.log("axios error: ", error.response);
      this.characters = {
        list: [],
        count: 0,
        isLoading: false,
        hasError: true,
        errorMessage: error,
      };
      return;
    }
    console.log("error: ", JSON.stringify(error));

    // this.characters = {
    //   list: [],
    //   count: 0,
    //   isLoading: false,
    //   hasError: true,
    //   errorMessage: JSON.stringify(error),
    // };
  },
});

characterStore.startLoadingCharacters();

export default characterStore;

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
    errorMessage: string | any;
  };

  ids: {
    list: {
      // * estoy especificando que en la lista habrá un arreglo de " id's ". Osea muchos id's
      [id: string]: Character;
    };
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | any;
  };

  //Metodos de characters

  //! Estoy declarando este metodo y le indico a TS que no me regresa nada
  startLoadingCharacters: () => void;
  loadedCharacters: (data: Character[]) => void;
  loadCharactersFailed: (error: any) => void;

  //Metodos por id's
  startLoadingCharacter: () => void;
  checkIdInStore: (id: string) => boolean;
  loadedCharacter: (character: Character) => void;
}

//* Initial State
const characterStore = reactive<Store>({
  // * Lista general de characters
  characters: {
    list: [],
    count: 0,
    isLoading: true,
    hasError: false,
    errorMessage: null,
  },

  // * Lista de characters por ID
  ids: {
    list: {},
    isLoading: false,
    hasError: false,
    errorMessage: "",
  },

  //Metodos  de characters
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
  },

  //Metodos por id
  startLoadingCharacter() {
    this.ids = {
      ...this.ids,
      isLoading: true,
      hasError: false,
      errorMessage: null,
    };
  },
  checkIdInStore(id) {
    return !!this.ids.list[id];
  },
  loadedCharacter(character) {
    this.ids.isLoading = false;
    this.ids.list[character.id] = character;
  },
});

characterStore.startLoadingCharacters();

export default characterStore;

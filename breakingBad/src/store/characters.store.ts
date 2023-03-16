import type { Character } from "@/characters/interfaces/character";
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
  startLoadingCharacters() {
    console.log("Hola soy el store");
  },
  loadedCharacters(data) {},
  loadCharactersFailed(error) {},
});

characterStore.startLoadingCharacters();

export default characterStore;
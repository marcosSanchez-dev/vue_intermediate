import { ref } from "vue";
import type { Character } from "../interfaces/character";
import breakingBadApi from "@/api/breakingBadApi";
import { useQuery } from "@tanstack/vue-query";

const characterSet = ref<{ [id: string]: Character }>({});
const hasError = ref(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async (characterId: string): Promise<Character> => {
  if (characterSet.value[characterId]) {
    return characterSet.value[characterId];
  }

  // ! Al obtener el ID por medio de los "params" hacemos la peticion en el componente de cada character por individual
  const { data } = await breakingBadApi.get<Character>(
    `/character/${characterId}`
  );

  // * Manejar error
  return data;
};

const loadedCharacter = (character: Character) => {
  hasError.value = false;
  errorMessage.value = null;
  characterSet.value[character.id] = character;
};

const useCharacter = (id: string) => {
  const { isLoading } = useQuery(
    // ! Le estoy pasando un " id " como parte del KEY que requier useQuery para diferenciar los querys o espacio de memoria
    ["characters-", id],
    // Si la funcion debe recibir un argumento, entonces debe declararse de esta forma
    () => getCharacter(id),
    {
      onSuccess: loadedCharacter,
      //todo: manejar error
    }
  );

  return {
    //properties
    list: characterSet,
    hasError,
    errorMessage,
    //getters

    //methods
  };
};

export default useCharacter;

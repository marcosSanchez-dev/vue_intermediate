import { computed, ref } from "vue";
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

  try {
    // ! Al obtener el ID por medio de los "params" hacemos la peticion en el componente de cada character por individual
    const { data } = await breakingBadApi.get<Character>(
      `/character/${characterId}`
    );

    return data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error(`Character with ID ${characterId} not found.`);
    } else {
      throw new Error(`Unexpected error occurred: ${error}`);
    }
  }

  // todo: Manejar error
};

const loadedCharacter = (character: Character) => {
  hasError.value = false;
  errorMessage.value = null;
  characterSet.value[character.id] = character;
};

const loadedWithError = (error: any) => {
  hasError.value = true;
  errorMessage.value = error.message;
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

      onError: loadedWithError,
    }
  );

  return {
    //properties
    isLoading,
    list: characterSet,
    hasError,
    errorMessage,
    //getters

    //* se usa la propiedad computada ya que al inicio de la request "character" es igual a null y al terminar la request la propiedad "character" actualiza su valor
    // ! La computed es de tipo <Character | null> porque antes de resolverse la peticion está trae null
    character: computed<Character | null>(() => characterSet.value[id]),

    //methods
  };
};

export default useCharacter;

import { useQuery } from '@tanstack/vue-query';
import { githubAPI } from 'src/api/gitHubApi';
import { Label } from '../interfaces/label';
import { useIssuesStore } from 'src/stores/issues';
import { computed } from 'vue';

const getLabels = async (): Promise<Label[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data } = await githubAPI.get<Label[]>(`/labels?per_page=100`);
        // console.log('data: ', data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
};

const useLabels = () => {
  const issuesStore = useIssuesStore();

  const { toggleLabel } = issuesStore;

  const { data: labelsQuery, isLoading } = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60,
  });

  return {
    //properties
    labelsQuery,
    isLoading,
    // ! Le estoy diciendo, observa la propiedad "issuesStore.labels" y si cambia actualiza el valor de labelsClicked
    //* Este computed se puede evitar si usamos storeToRefs() para desestrcuturar la variable labels en el issuesStore
    labelsClicked: computed(() => issuesStore.labels),
    //Methods
    toggleLabel,
  };
};

export default useLabels;

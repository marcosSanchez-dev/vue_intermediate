import { useQuery } from '@tanstack/vue-query';
import { githubAPI } from 'src/api/gitHubApi';
import { Label } from '../interfaces/label';

const getLabels = async (): Promise<Label[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data } = await githubAPI.get<Label[]>(`/labels?per_page=100`);
        console.log('data: ', data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
};

const useLabels = () => {
  const labelsQuery = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60,
  });

  return { labelsQuery };
};

export default useLabels;

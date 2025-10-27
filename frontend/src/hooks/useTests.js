import { useQuery } from '@tanstack/react-query';
import { getAllTests } from '../services/tests';

export const useTests = (params) => {
  return useQuery(['tests', params], () => getAllTests(params), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

import useSWR from 'swr';

import { ILocation } from '../postgresql/types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useGetLocations() {
  const { data, error, isLoading } = useSWR<ILocation[]>(`/api/locations`, fetcher);

  return { locations: data, locationsError: error, locationsIsLoading: isLoading };
}

import useSWR from 'swr';

import { IReview } from '../postgresql/types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useGetReviews(locationId: number) {
  const { data, error, isLoading } = useSWR<IReview[]>(
    locationId ? `/api/reviews?location_id=${locationId}` : null,
    fetcher
  );

  return { reviews: data, reviewsError: error, reviewsIsLoading: isLoading };
}

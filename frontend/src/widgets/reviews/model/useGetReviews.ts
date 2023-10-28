'use client';

import { useEffect, useState } from 'react';

import { IReview } from '@/shared/api/postgresql/types';
import { getReviews } from '@/shared/api/server/getReviews';

export function useGetReviews(locationId: number) {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    async function downloadReviews() {
      const { data } = await getReviews(locationId);
      setReviews(data);
    }
    downloadReviews();
  }, [locationId]);

  return [reviews] as const;
}

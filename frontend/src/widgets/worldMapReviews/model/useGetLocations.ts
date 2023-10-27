'use client';

import { useEffect, useState } from 'react';

import { ILocation } from '@/shared/api/postgresql/types';
import { getLocations } from '@/shared/api/server/getLocations';

export function useGetLocations() {
  const [locations, setLocations] = useState<ILocation[]>([]);

  useEffect(() => {
    async function downloadLocations() {
      const { data } = await getLocations();
      setLocations(data);
    }
    downloadLocations();
  }, []);

  return [locations];
}

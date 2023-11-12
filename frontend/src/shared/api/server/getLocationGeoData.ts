import { GETLocationGeoDataResponse } from './types';

export async function getLocationGeoData(location: string) {
  const data: GETLocationGeoDataResponse = await fetch(
    `/api/geolocation?location=${location}`
  )
    .then((res) => res.json())
    .catch((error) => {});

  return data;
}

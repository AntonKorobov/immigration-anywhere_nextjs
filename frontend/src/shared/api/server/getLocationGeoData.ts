import { GETLocationGeoDataResponse } from './types';

export async function getLocationGeoData(location: string) {
  console.log('request GET GeoData');

  const data: GETLocationGeoDataResponse = await fetch(
    `/api/get-location-geodata?location=${location}`
  )
    .then((res) => res.json())
    .catch((error) => {});

  return data;
}

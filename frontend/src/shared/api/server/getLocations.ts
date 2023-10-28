import { GETLocationsResponse } from './types';

export async function getLocations() {
  const data: GETLocationsResponse = await fetch(`/api/locations/`)
    .then((res) => res.json())
    .catch((error) => console.error(error));
  console.log(data);
  return data;
}

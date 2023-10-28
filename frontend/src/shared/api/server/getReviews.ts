import { GETReviewsResponse } from './types';

export async function getReviews(locationId: number) {
  const data: GETReviewsResponse = await fetch(`/api/reviews?location_id=${locationId}`)
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return data;
}

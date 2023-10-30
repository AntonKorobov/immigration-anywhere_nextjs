import { POSTReviewsRequest, POSTReviewsResponse } from './types';

export async function postReview(reviewData: POSTReviewsRequest) {
  const data: POSTReviewsResponse = await fetch(`/api/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return data;
}

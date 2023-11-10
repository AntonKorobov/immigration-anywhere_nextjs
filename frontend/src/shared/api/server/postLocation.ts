import { IPostLocationPostgresqlRequest } from '../postgresql/types';
import { POSTLocationResponse } from './types';

export async function postLocation(reviewData: IPostLocationPostgresqlRequest) {
  const data: POSTLocationResponse = await fetch(`/api/locations`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  return data;
}

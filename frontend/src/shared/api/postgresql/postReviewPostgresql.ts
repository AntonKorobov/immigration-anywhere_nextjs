import { sql } from '@vercel/postgres';

import { IGetReviewsPostgresqlResponse, IPostReviewPostgresqlRequest } from './types';
import { postLocationPostgresql } from './postLocationPostgresql';
import { getLocationPostgresql } from './getLocationPostgresql';

export async function postReviewPostgresql({
  userName,
  rating,
  reviewText,
  locationGeoData,
}: IPostReviewPostgresqlRequest): Promise<IGetReviewsPostgresqlResponse> {
  let locationData = await getLocationPostgresql(locationGeoData.locationName);
  if (!locationData?.rows[0]?.location_name) {
    //TODO more clear check
    await postLocationPostgresql(locationGeoData);
    locationData = await getLocationPostgresql(locationGeoData.locationName);
  }
  const locationId = locationData.rows[0].location_id;
  return sql`INSERT INTO reviews (user_name, location_id, rating, review_text) VALUES (${userName}, ${locationId}, ${rating}, ${reviewText});` as unknown as IGetReviewsPostgresqlResponse;
}

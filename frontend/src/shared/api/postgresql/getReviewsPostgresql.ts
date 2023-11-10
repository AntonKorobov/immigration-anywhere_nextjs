import { sql } from '@vercel/postgres';

import { IGetReviewsPostgresqlResponse } from './types';

export async function getReviewsPostgresql(
  locationId: number
): Promise<IGetReviewsPostgresqlResponse> {
  return sql`SELECT * FROM reviews WHERE location_id=${locationId};` as unknown as IGetReviewsPostgresqlResponse;
}

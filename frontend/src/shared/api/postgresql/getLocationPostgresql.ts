import { sql } from '@vercel/postgres';

import { IGetLocationsPostgresqlResponse } from './types';

export async function getLocationPostgresql(
  locationName: string
): Promise<IGetLocationsPostgresqlResponse> {
  return sql`SELECT * FROM locations WHERE location_name=${locationName};` as unknown as IGetLocationsPostgresqlResponse;
}

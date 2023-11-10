import { sql } from '@vercel/postgres';

import { IGetLocationsPostgresqlResponse } from './types';

export async function getLocationsPostgresql(): Promise<IGetLocationsPostgresqlResponse> {
  return sql`SELECT * FROM locations;` as unknown as IGetLocationsPostgresqlResponse;
}

import { GETLocationGeoDataResponse, ILocationGeoData } from '../server/types';

export interface ILocation {
  location_id: number;
  location_name: string;
  country_code: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface IGetLocationsPostgresqlResponse {
  [key: string]: unknown;
  rows: ILocation[];
}

export interface IPostLocationPostgresqlRequest {
  locationName: string;
  coordinates: { x: number; y: number };
  countryId: string;
}

export interface IReview {
  user_name: string;
  review_id: number;
  location_id: number;
  rating: number;
  review_text: string;
}

export interface IGetReviewsPostgresqlResponse {
  [key: string]: unknown;
  rows: IReview[];
}

export interface IPostReviewPostgresqlRequest {
  userName: string;
  rating: number;
  reviewText: string;
  locationGeoData: ILocationGeoData;
}

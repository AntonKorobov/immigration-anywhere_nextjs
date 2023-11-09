import { ILocation, IReview } from '../postgresql/types';

export interface GETLocationGeoDataResponseData {
  latitude: number;
  longitude: number;
  label: string;
  name: string;
  type: string;
  number: string;
  street: string;
  postal_code: string;
  confidence: number;
  region: string;
  region_code: string;
  administrative_area: string;
  neighbourhood: string;
  country: string;
  country_code: string;
  map_url: string;
}

export interface GETLocationGeoDataResponseFull {
  data: GETLocationGeoDataResponseData[];
}

export interface ILocationGeoData {
  locationName: string;
  coordinates: { x: number; y: number };
  countryId: string;
}

export type GETLocationGeoDataResponse = ILocationGeoData[];

export interface POSTLocationRequest {
  locationName: string;
  coordinates: { x: number; y: number };
  countryId: string;
}

export interface POSTLocationResponse {
  data: ILocation;
  status: number;
}

export interface GETLocationsResponse {
  data: ILocation[];
  status: number;
}

export interface GETReviewsResponse {
  data: IReview[];
  status: number;
}

export interface POSTReviewsRequest {
  userName: string;
  rating: number;
  reviewText: string;
  locationName: string;
  locationGeoData: ILocationGeoData;
}

export interface POSTReviewsResponse {
  data: IReview;
  status: number;
}

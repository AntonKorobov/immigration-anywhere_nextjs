export interface ILocation {
  location_id: number;
  location_name: string;
  country_code: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface ISelectFromLocationsResponse {
  [key: string]: unknown;
  rows: ILocation[];
}

export interface IReview {
  user_name: string;
  review_id: number;
  location_id: number;
  rating: number;
  review_text: string;
}

export interface ISelectFromReviewsResponse {
  [key: string]: unknown;
  rows: IReview[];
}

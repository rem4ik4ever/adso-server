export interface LocationInterface {
  latitude: number;
  longitude: number;
  distance: number;
}

export interface PriceRangeInterface {
  from: number;
  to: number;
}

export interface PostFilterInterface {
  searchTerm?: string;
  location?: LocationInterface;
  priceRange?: PriceRangeInterface;
  categoryId?: number;
  userId?: number;
}

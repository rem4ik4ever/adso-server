import { PostPaginationInterface } from "./pagination.interfaces";

export interface LocationInterface {
  latitude?: number;
  longitude?: number;
  distance?: number;
}

export interface PriceRangeInterface {
  from?: number;
  to?: number;
}

export interface PostFilterInterface
  extends PostPaginationInterface,
    LocationInterface,
    PriceRangeInterface {
  searchTerm?: string;
  categoryId?: number;
  userId?: number;
}

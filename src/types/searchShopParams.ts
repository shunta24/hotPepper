export type SearchShopRequest = {
  areaCode?: string;
  shopName?: string;
  latitude?: number;
  longitude?: number;
  range?: string;
  start?: number;
  searchConditions?: string[];
};

export type DistanceSearchParams = {
  latitude: number;
  longitude: number;
  range: string;
  searchConditions?: string[];
};

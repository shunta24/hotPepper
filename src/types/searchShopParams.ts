export type SearchShopRequest = {
  areaCode?: string;
  shopName?: string;
  latitude?: number;
  longitude?: number;
  range?: string;
  start?: number;
  isDetailArea?: boolean;
  searchParams?: string[];
};

export type DistanceSearchParams = {
  latitude: number;
  longitude: number;
  range: string;
};

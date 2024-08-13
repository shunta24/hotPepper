import { ShopData } from "./shopData";

export type HotPepperApiResponse = {
  api_version: string;
  results_available: number;
  results_returned: string;
  results_start: number;
  shop: ShopData[];
};

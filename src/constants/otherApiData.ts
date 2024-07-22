export const AREA_API_END_POINT = `http://webservice.recruit.co.jp/hotpepper/middle_area/v1/?format=json&key=${process.env.HOT_PEPPER_API_KEY}`;
export const AREA_API_END_POINT2 = `http://webservice.recruit.co.jp/hotpepper/middle_area/v1/?format=json&key=${process.env.HOT_PEPPER_API_KEY2}`;
export const SHOPS_API_END_POINT2 = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?format=json&key=${process.env.HOT_PEPPER_API_KEY2}`;
export const SHOPS_API_END_POINT = AREA_API_END_POINT.replace(
  "middle_area",
  "gourmet"
);
export const DEFAULT_GET_DATA_COUNT = 20;

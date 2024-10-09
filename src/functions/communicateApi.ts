import {
  AREA_API_END_POINT,
  DEFAULT_GET_DATA_COUNT,
  DETAIL_AREA_API_END_POINT,
  SHOPS_API_END_POINT,
} from "@/constants/otherApiData";
import { logger } from "@/functions/logger";
import { SearchShopRequest } from "@/types/searchShopParams";

export const getAreaData = async (areaCode: string) => {
  return await fetch(AREA_API_END_POINT + `&large_area=${areaCode}`)
    .then((data) => data.json())
    .catch((e) => e);
};

export const getDetailAreaData = async (areaCode: string) => {
  return await fetch(DETAIL_AREA_API_END_POINT + `&middle_area=${areaCode}`)
    .then((data) => data.json())
    .catch((e) => e);
};

export const getShopsData = async ({
  areaCode,
  searchParams,
  shopName,
  start = 1,
  latitude,
  longitude,
  range,
  isDetailArea,
}: SearchShopRequest) => {
  const options = searchParams?.join("&");
  const searchRange = isDetailArea ? "&small_area=" : "&middle_area=";

  const apiRequestParams =
    SHOPS_API_END_POINT +
    `&count=${DEFAULT_GET_DATA_COUNT}&start=${start}${areaCode ? searchRange + areaCode : ""}${shopName ? "&name=" + shopName : ""}${range ? "&range=" + range + "&lat=" + latitude + "&lng=" + longitude : ""}${options ? "&" + options : ""}`;

  logger.info({ apiRequestParams });

  return await fetch(apiRequestParams)
    .then((data) => data.json())
    .catch((e) => e);
};

export const getShopsDataClient = async (
  requestParams: SearchShopRequest,
  start?: number
) => {
  return await fetch("api/connectHotPepperApi", {
    method: "POST",
    body: JSON.stringify({ ...requestParams, start }),
  })
    .then((data) => {
      if (data.status === 200) {
        return data.json();
      } else {
        throw new Error("Failed to Client Api Error");
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

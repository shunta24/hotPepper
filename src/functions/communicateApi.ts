import {
  AREA_API_END_POINT,
  DEFAULT_GET_DATA_COUNT,
  SHOPS_API_END_POINT,
} from "@/constants/otherApiData";
import { SearchShopRequest } from "@/types/searchShopParams";
import { logger } from "./logger";

export const getAreaData = async (areaCode: string) => {
  return await fetch(AREA_API_END_POINT + `&large_area=${areaCode}`)
    .then((data) => data.json())
    .catch((e) => e);
};

export const getShopsData = async ({
  areaCode,
  searchConditions,
  shopName,
  start = 1,
  latitude,
  longitude,
  range,
}: SearchShopRequest) => {
  const options = searchConditions?.join("&");

  const apiRequestParams =
    SHOPS_API_END_POINT +
    `&count=${DEFAULT_GET_DATA_COUNT}&start=${start}${areaCode ? "&middle_area=" + `${areaCode}` : ""}${shopName ? "&name=" + `${shopName}` : ""}${range ? "&range=" + `${range}` + "&lat=" + `${latitude}` + "&lng=" + `${longitude}` : ""}${options ? "&" + options : ""}`;

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

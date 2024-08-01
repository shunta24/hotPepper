import { DistanceParams } from "@/types/distanceParams";
import {
  AREA_API_END_POINT,
  DEFAULT_GET_DATA_COUNT,
  SHOPS_API_END_POINT,
} from "@/constants/otherApiData";

export const getAreaData = async (areaCode: string) => {
  return await fetch(AREA_API_END_POINT + `&large_area=${areaCode}`)
    .then((data) => data.json())
    .catch((e) => e);
};

export const getShopsData = async (
  areaCode: string,
  start: number = 1,
  params?: string[]
) => {
  return await fetch(
    SHOPS_API_END_POINT +
      `&count=${DEFAULT_GET_DATA_COUNT}&start=${start}&middle_area=${areaCode}`
  )
    .then((data) => data.json())
    .catch((e) => e);
};

export const getShopsDataFromCurrent = async ({
  latitude,
  longitude,
  range,
  start = 1,
}: {
  latitude: string;
  longitude: string;
  range: string;
  start: number;
}) => {
  return await fetch(
    SHOPS_API_END_POINT +
      `&count=${DEFAULT_GET_DATA_COUNT}&start=${start}&lat=${latitude}&lng=${longitude}&range=${range}`
  )
    .then((data) => data.json())
    .catch((e) => e);
};

export const getShopsDataClient = async (
  requestParams: string | DistanceParams,
  start?: number
) => {
  const isCurrentInfo = typeof requestParams === "object";
  const params = isCurrentInfo
    ? { ...requestParams, start }
    : { areaCode: requestParams, start };

  return await fetch(
    `api/${isCurrentInfo ? "currentShopList" : "areaShopList"}`,
    {
      method: "POST",
      body: JSON.stringify(params),
    }
  )
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

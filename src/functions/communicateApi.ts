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

export const getShopsDataClient = async (
  requestAreaCode: string,
  start?: number
) => {
  return await fetch("api/hotPepper", {
    method: "POST",
    body: JSON.stringify({ requestAreaCode, start }),
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

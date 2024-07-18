const AREA_API_END_POINT = `http://webservice.recruit.co.jp/hotpepper/middle_area/v1/?format=json&key=${process.env.HOT_PEPPER_API_KEY}`;
const SHOPS_API_END_POINT = AREA_API_END_POINT.replace(
  "middle_area",
  "gourmet"
);

export const getAreaData = async (areaCode: string) => {
  try {
    return await fetch(AREA_API_END_POINT + `&large_area=${areaCode}`)
      .then((data) => data.json())
      .catch((e) => e.json());
  } catch (error) {
    throw new Error("Failed To Get Area Data");
  }
};

export const getShopsData = async (areaCode: string, params?: string[]) => {
  try {
    return await fetch(
      SHOPS_API_END_POINT + `&count=20&middle_area=${areaCode}`
    )
      .then((data) => data.json())
      .catch((e) => e.json());
  } catch (error) {
    throw new Error("Failed To Get Shops Data");
  }
};

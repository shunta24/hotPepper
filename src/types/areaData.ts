export type DetailAreaData = {
  code: string;
  name: string;
  middle_area: { code: string; name: string };
  large_area: { code: string; name: string };
  service_area: { code: string; name: string };
  large_service_area: { code: string; name: string };
};

export type AreaData = Omit<DetailAreaData, "middle_area">;

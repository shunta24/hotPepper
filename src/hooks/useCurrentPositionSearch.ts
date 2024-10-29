import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { logger } from "@/functions/logger";
import { positionInfoAtom } from "@/recoil/positionInfoAtom";

export const useCurrentPositionSearch = () => {
  const [positionData, setPositionData] = useRecoilState(positionInfoAtom);
  const [currentPositionMsg, setCurrentPositionMsg] = useState<string>(
    "※現在地取得中...少々お待ちください"
  );

  useEffect(() => {
    if (!positionData.latitude) {
      (async () => {
        try {
          const positionData: GeolocationPosition = await new Promise(
            (resolve, reject) =>
              navigator.geolocation.getCurrentPosition(resolve, reject)
          );
          const { latitude, longitude } = positionData.coords;
          setPositionData((prev) => ({ ...prev, latitude, longitude }));
        } catch (error) {
          logger.error(error);
          setCurrentPositionMsg("※位置情報の取得を許可してください");
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    positionData,
    currentPositionMsg,
  };
};

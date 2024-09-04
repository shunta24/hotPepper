"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import { memo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Accordion from "@/components/accordion";
import Loading from "@/components/loading";
import { AREA_NAME, PREFECTURES_DATA } from "@/constants/prefecturesData";
import { loadingStateAtom } from "@/recoil/loadingAtom";

export const AreaSelect = memo(() => {
  const setIsLoading = useSetRecoilState(loadingStateAtom);

  useEffect(() => {
    // NOTE:loadingが残ってしまうのでページ遷移時に消す
    return () => {
      setIsLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Loading />
      {AREA_NAME.map((areaName, index) => (
        // NOTE:/80→ bg-colorにopacityを設定する新しい書き方
        <div className="bg-white/80" key={index}>
          <Accordion title={areaName}>
            {PREFECTURES_DATA[index].map((prefName) => (
              <Link
                className="p-2"
                href={{
                  pathname: "/main",
                  query: { area: prefName.params },
                }}
                key={prefName.params}
                // NOTE:一度エリアを選択したら他のボタンを押せないようにする
                onClick={() => setIsLoading(true)}
              >
                <Button
                  id={prefName.params}
                  variant="contained"
                  sx={{ marginTop: "10px" }}
                  key={prefName.params}
                >
                  {prefName.name}
                </Button>
              </Link>
            ))}
          </Accordion>
        </div>
      ))}
    </>
  );
});

export default AreaSelect;
AreaSelect.displayName = "AreaSelect";

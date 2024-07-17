import { AREA_NAME, PREFECTURES_DATA } from "@/constants/prefecturesData";
import { Button } from "@mui/material";
import Accordion from "@/components/accordion";
import Link from "next/link";

const TopPage = () => {
  return (
    <main>
      <div className="bg-blue-400 text-center rounded-[30%] mt-6 p-10">
        <h1 className="font-bold">食べたいお店が見つかるサイト</h1>
        <h2>最初にエリアを選択してください</h2>
      </div>
      
      <section className="grid gap-2 ">
        {AREA_NAME.map((areaName, index) => (
          <Accordion title={areaName}>
            {PREFECTURES_DATA[index].map((prefName) => (
              <Link
                className="p-2"
                href={{
                  pathname: "/list",
                  query: { area: prefName.params },
                }}
              >
                <Button variant="contained" sx={{ marginTop: "10px" }}>
                  {prefName.name}
                </Button>
              </Link>
            ))}
          </Accordion>
        ))}
      </section>
    </main>
  );
};

export default TopPage;

import { redirect } from "next/navigation";
import { AREA_CODE } from "@/constants/prefecturesData";
import MainPage from "@/pages/mainPage/mainPage";

const Main = ({ searchParams }: { searchParams: { area: string } }) => {
  const { area } = searchParams;
  const isPrefectureName = Object.keys(AREA_CODE).some(
    (prefectureName) => prefectureName === area
  );
  if (!area || !isPrefectureName) {
    redirect("/");
  }

  return <MainPage areaCode={AREA_CODE[area]} />;
};

export default Main;

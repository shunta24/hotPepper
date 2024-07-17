import ShopList from "@/pages/shopList/shopList";

const Main = ({ searchParams }: { searchParams: { area: string } }) => {
  return <ShopList prefectureCode={searchParams.area} />;
};

export default Main;

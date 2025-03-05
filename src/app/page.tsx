import SwipperSlider from "@/components/Slider/headerSlider";
import ProductCard from "@/ReusableComp/ProductCard";
import { Title } from "@/ReusableComp/titles";

export default function Home() {
  return (
    <>
      <SwipperSlider />
      <Title title="Our Products" cssClasses=" text-mainColor flex justify-center items-center " />
      <ProductCard />
    </>
  );
}

import React, { Suspense } from "react";
const SwipperSlider = React.lazy(() => import("@/components/Slider/headerSlider"));
const ProductCard = React.lazy(() => import("@/ReusableComp/ProductCard"));
const Title = React.lazy(() => import("@/ReusableComp/titles"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SwipperSlider />
        <ProductCard />
      </Suspense>
    </>
  );
}

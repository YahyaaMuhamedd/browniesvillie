import React, { Suspense } from "react";
import Title from "@/ReusableComp/titles"

const Cart = React.lazy(() => import("@/components/cart/cart"));

function CartPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Cart />
        </Suspense>
    )

}

export default CartPage
import React, { Suspense } from "react"
import LoadingSpinner from "@/ReusableComp/loadingSpinner";

const OrderForm = React.lazy(() => import("../orderForm"));

interface orderSumarryProps {
    total: number
}

const OrderSumarry = ({ total }: orderSumarryProps) => {
    const handleCloseOrderForm = () => {
        // Handle close if needed
    };

    return (
        <div className="relative z-[500]">
            {/* Order Summary */}
            <div className="p-4 rounded-lg border border-color bg-white/25 backdrop-blur-lg mb-2">
                <h2 className="text-2xl font-bold text-mainColor mb-4">Order Summary</h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <p className="text-black font-semibold">Subtotal</p>
                        <p className="text-black">${total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-black font-semibold">Shipping</p>
                        <p className="text-black">$50.00</p>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                        <p className="text-black font-semibold">Total</p>
                        <p className="text-black">${(total + 50).toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <OrderForm onClose={handleCloseOrderForm} />
        </div>
    )
}

export default OrderSumarry
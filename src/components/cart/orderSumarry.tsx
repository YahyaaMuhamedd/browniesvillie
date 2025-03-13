import OrderForm from "../orderForm"

interface orderSumarryProps {
    total: number
}
export const OrderSumarry = ({ total }: orderSumarryProps) => {
    return (
        <>
            {/* ملخص الطلب */}
            <div className="bg-bgSecondColor p-6 rounded-lg border border-color h-fit">
                <h2 className="text-2xl font-bold text-mainColor mb-4">Order Summary</h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Shipping</p>
                        <p>50</p>
                    </div>
                    <div className="flex justify-between font-bold">
                        <p>Total</p>
                        <p>${(total + 50).toFixed(2)}</p>
                    </div>
                </div>

                <OrderForm onClose={() => { }} />
            </div>
        </>
    )
}



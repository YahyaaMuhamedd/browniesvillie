import Cart from "@/components/cart/cart"
import { Title } from "@/ReusableComp/titles"

function CartPage() {
    return (
        <>
            <Title title="Your Cart" cssClasses=" text-mainColor flex justify-center items-center " />
            <Cart />
        </>
    )

}

export default CartPage
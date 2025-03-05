"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import { fetchProducts } from "@/services/ProductServices";
import Image from "next/image";
import { useEffect } from "react";
import Button from "./Button";
import { addToLocalStorage } from "@/functions/localStorage";

const ProductCard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { Product, Loading, Error } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (Loading) return <>Loading...</>;
    if (Error) return <>{Error}</>;


    return (
        <>
            <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6 contain mx-auto px-4 max-md:px-2">
                {Product.map((product) => (
                    <div
                        key={product._id}
                        className="border-4 border-color border-opacity-80 rounded-lg flex flex-col justify-center items-center p-6 bg-bgSecondColor shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105"
                    >
                        {product.image && (
                            <Image
                                src={product.image}
                                width={200}
                                height={200}
                                alt={product.title}
                                className="rounded-lg mb-4"
                            />
                        )}
                        <h2 className="text-3xl capitalize text-mainColor font-bold mb-2 m-auto">
                            {product.title}
                        </h2>
                        <h2 className="text-[#B15D26] text-lg text-center mb-2 m-auto">
                            {product.description}
                        </h2>
                        <p className="text-xl font-semibold text-mainColor">${product.price}</p>
                        <Button cssClasses="bg-mainColor hover:bg-secondColor text-white"
                            buttonName="Add to Cart" handleclick={() => addToLocalStorage({
                                key: 'cart',
                                value: product
                            })} />
                    </div>
                ))}
            </div>

        </>
    )
}

export default ProductCard
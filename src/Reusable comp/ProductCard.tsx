"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import { fetchProducts } from "@/services/ProductServices";
import Image from "next/image";
import React, { useEffect } from "react";

const ProductCard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { Product, Loading, Error } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (Loading) return <div>Loading...</div>;



    return (
        <>
            {Product.map((product) => (
                <div key={product._id}>
                    <h2>{product.title}</h2>
                    <h2>{product.description}</h2>
                    <p>{product.price}</p>
                    {product.image && <Image src={product.image} width={200} height={200} alt={product.title} />}

                    {Error}
                </div>
            ))}
        </>
    )
}

export default ProductCard
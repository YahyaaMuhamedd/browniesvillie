"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import { fetchProductsQuery } from "@/services/ProductServices";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";
import { addToLocalStorage } from "@/functions/localStorage";
import { setHrefLocation, setMessage } from "@/store/Slices/feedBackSlice";
import { ArrayConverter } from "@/helpers/arrayConverter";
import { Product } from "@/types/ProductTypes";
import { useQuery } from "@tanstack/react-query";

const ProductCard: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const dispatch = useAppDispatch();
    // const { Product, Loading, Error } = useAppSelector((state) => state.products);

    // useEffect(() => {
    //     dispatch(fetchProducts());
    // }, [dispatch]);


    // Using For Fetching Data Reqct Query instead of Redux ToolKit and we will compare between it to know wich one is better ya omar 

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductsQuery,
    });



    useEffect(() => {

        const fetchCart = async () => {
            const cartLocalStorage = localStorage.getItem("cart");
            if (cartLocalStorage) {
                setCart(ArrayConverter(cartLocalStorage));
            }
        };

        fetchCart();
    }, []);

    if (isLoading) return <div className="text-center text-5xl text-mainColor"> Loading ....</div>;
    if (isError) return <>{error}</>;

    return (
        <>
            <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6 contain mx-auto px-4 max-md:px-2">
                {data.map((product: Product) => {
                    const existingProduct = cart.find((item) => item._id === product._id);

                    return (
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
                            <h2 className="text-3xl capitalize text-mainColor text-center font-bold mb-2 m-auto">
                                {product.title}
                            </h2>
                            <h2 className="text-mainColor text-lg text-center mb-2 m-auto">
                                {product.description}
                            </h2>
                            <p className="text-xl font-semibold text-mainColor">${product.price}</p>
                            <Button
                                cssClasses="bg-mainColor hover:bg-hoverColor text-white"
                                buttonName="Add to Cart"
                                handleclick={() => {
                                    if (existingProduct) {
                                        dispatch(setMessage("Product Already In Cart"));
                                        dispatch(setHrefLocation("Cart"));
                                    } else {
                                        addToLocalStorage({
                                            key: 'cart',
                                            value: product,
                                        });
                                        dispatch(setMessage(`${product.title} Added To Cart`));
                                        dispatch(setHrefLocation('Cart'));
                                    }
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ProductCard;
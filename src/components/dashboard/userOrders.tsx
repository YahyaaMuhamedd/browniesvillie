"use client";

import { useAppSelector } from "@/hooks/Redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { CreateOrder } from "@/services/orderServices";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/ReusableComp/pagination";
import { formatDate } from "@/helpers/formatDate";

export const MyOrders = () => {
    const { user } = useAppSelector((state: RootState) => state.user);

    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filterStatus, setFilterStatus] = useState<string>("all");

    const { displayedItems, currentPage, handlePageChange, totalPages } = usePagination<any>({
        items: orders,
        backendPagination: false,
        itemsPerPage: 5,
        totalBackendPages: 1,
    });

    useEffect(() => {
        if (user?.myOrders) {
            let filteredOrders = user.myOrders;
            if (filterStatus !== "all") {
                filteredOrders = filteredOrders.filter((order: any) => order.status === filterStatus);
            }
            setOrders([...filteredOrders].reverse());
        }
        setLoading(false);
    }, [user, filterStatus]);

    const handleRepeatOrder = async (order: any) => {
        try {
            const formData = {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: order.address,
                floor: order.floor,
                apartment: order.apartment,
                desc: order.desc,
                orderItems: order.orderItems,
                paymentMethod: order.paymentMethod,
            };
            await CreateOrder(formData);
            alert("Order repeated successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to repeat order. Please try again.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full mt-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold text-mainColor">My Orders</h2>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border p-2 rounded-md text-sm"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {loading ? (
                <p>Loading orders...</p>
            ) : displayedItems.length > 0 ? (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full table-auto text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="py-2 px-4">Order ID</th>
                                    <th className="py-2 px-4">Address</th>
                                    <th className="py-2 px-4">Payment</th>
                                    <th className="py-2 px-4">Status</th>
                                    <th className="py-2 px-4">Items</th>
                                    <th className="py-2 px-4">Date</th>
                                    <th className="py-2 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedItems.map((order: any) => (
                                    <tr key={order._id} className="border-b">
                                        <td className="py-2 px-4">{order._id.slice(0, 8)}...</td>
                                        <td className="py-2 px-4">
                                            {order.address} (Floor {order.floor}, Apt {order.apartment})
                                        </td>
                                        <td className="py-2 px-4 capitalize">{order.paymentMethod}</td>
                                        <td className="py-2 px-4 capitalize">{order.status}</td>
                                        <td className="py-2 px-4">
                                            {order.orderItems.map((item: any, i: number) => (
                                                <div key={i}>
                                                    {item.name} x{item.quantity}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="py-2 px-4">{formatDate(order.createdAt)}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => handleRepeatOrder(order)}
                                                className="bg-mainColor hover:bg-opacity-90 text-white text-xs py-1 px-3 rounded-md"
                                            >
                                                Repeat Order
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="block md:hidden space-y-4">
                        {displayedItems.map((order: any) => (
                            <div key={order._id} className="border rounded-lg p-4 shadow-sm">
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Order:</strong> {order._id.slice(0, 8)}...
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Address:</strong> {order.address} (Floor {order.floor}, Apt {order.apartment})
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Payment:</strong> {order.paymentMethod}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Status:</strong> {order.status}
                                </p>
                                <div className="text-sm text-gray-600 mb-1">
                                    <strong>Items:</strong>
                                    <ul className="pl-4 list-disc">
                                        {order.orderItems.map((item: any, i: number) => (
                                            <li key={i}>{item.name} x{item.quantity}</li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    <strong>Date:</strong> {formatDate(order.createdAt)}
                                </p>
                                <button
                                    onClick={() => handleRepeatOrder(order)}
                                    className="bg-mainColor text-white text-xs py-2 px-4 rounded-md w-full"
                                >
                                    Repeat Order
                                </button>
                            </div>
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        showPrevNextButtons
                    />
                </>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <p>No orders found yet. Start shopping!</p>
                </div>
            )}
        </div>
    );
};

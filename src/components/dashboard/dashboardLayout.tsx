"use client";

import { UserCircle, MapPin, Home, Menu, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { Profile } from "./profile";
import { MyOrders } from "./userOrders";
import useClickOutside from "@/hooks/useClickOutside";
const AddressManager = React.lazy(() => import("./Addresses"));

const sidebarItems = [
    { label: "Profile", icon: UserCircle, key: "profile" },
    { label: "Addresses", icon: MapPin, key: "addresses" },
    { label: "My Orders", icon: Home, key: "orders" },
];

const DashboardLayout = () => {
    const [activePage, setActivePage] = useState("profile");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    useClickOutside(sidebarRef, () => setSidebarOpen(false), toggleButtonRef);

    return (
        <div className="flex flex-col md:flex-row min-h-screen text-mainColor bg-secondryColor">
            {/* Top Bar for Mobile */}
            <div className="flex md:hidden items-center justify-between p-4 border-b border-gray-300">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <button
                    ref={toggleButtonRef}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-mainColor"
                >
                    {sidebarOpen ? null : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`md:relative md:translate-x-0 md:w-64 w-64 fixed top-0 left-0 z-20 h-full bg-white shadow-lg md:shadow-none transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:static`}
            >
                <div className="flex items-center justify-between p-4 md:p-6 border-b md:border-none">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <button
                        className="md:hidden text-gray-600"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <ul className="space-y-4 px-4 md:px-6 py-4">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.key}
                                className={`cursor-pointer flex items-center gap-3 p-2 rounded hover:bg-mainColor hover:text-white transition ${activePage === item.key ? "bg-mainColor text-white" : ""
                                    }`}
                                onClick={() => {
                                    setActivePage(item.key);
                                    setSidebarOpen(false);
                                }}
                            >
                                <Icon className="w-5 h-5" /> {item.label}
                            </li>
                        );
                    })}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0">
                {activePage === "profile" && <Profile />}
                {activePage === "addresses" && <AddressManager />}
                {activePage === "orders" && <MyOrders />}
            </main>
        </div>
    );
};

export default DashboardLayout;

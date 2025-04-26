'use client';
import { UserCircle, Home, MapPin } from "lucide-react";
import { useState } from "react";
import { Profile } from "./profile";
import { AddressManager } from "./Addresses";

const sidebarItems = [
    { label: "Profile", icon: <UserCircle className="w-5 h-5" />, key: "profile" },
    { label: "Addresses", icon: <MapPin className="w-5 h-5" />, key: "addresses" },
];
const DashboardLayout = () => {
    const [activePage, setActivePage] = useState("profile");

    return (
        <div className="flex min-h-screen text-mainColor bg-secondryColor">
            <aside className="w-64 p-6 border-r border-gray-300">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <ul className="space-y-4">
                    {sidebarItems.map((item) => (
                        <li
                            key={item.key}
                            className={`cursor-pointer flex items-center gap-2 p-2 rounded hover:bg-mainColor hover:text-white transition ${activePage === item.key ? "bg-mainColor text-white" : ""
                                }`}
                            onClick={() => setActivePage(item.key)}
                        >
                            {item.icon} {item.label}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="flex-1 p-6">
                {activePage === "profile" && <Profile />}
                {activePage === "addresses" && <AddressManager />}
            </main>
        </div>
    );
};

export default DashboardLayout;
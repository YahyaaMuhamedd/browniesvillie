"use client";

import { useAppSelector } from "@/hooks/Redux";
import { RootState } from "@/store/store";

export const Profile = () => {
    const { user } = useAppSelector((state: RootState) => state.user);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full">
            <h1 className="text-2xl font-bold text-mainColor mb-6">Welcome, {user?.name}</h1>
            <div className="space-y-3">
                <p><span className="font-semibold">Email:</span> {user?.email}</p>
                <p><span className="font-semibold">Phone:</span> {user?.phone}</p>
            </div>
        </div>
    );
};

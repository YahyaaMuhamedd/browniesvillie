'use client'
import React from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/ReusableComp/loadingSpinner";

const DashboardLayout = dynamic(() => import("@/components/dashboard/dashboardLayout"), {
    ssr: false,
    loading: () => <LoadingSpinner />,
});




const DashboardPage = () => {
    return (
        <>
            <DashboardLayout />
        </>

    );
};

export default DashboardPage;



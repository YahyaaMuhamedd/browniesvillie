import React from "react";


const DashboardLayout = React.lazy(() => import('@/components/dashboard/dashboardLayout'));


const DashboardPage = () => {
    return (
        <>
            <DashboardLayout />
        </>

    );
};

export default DashboardPage;



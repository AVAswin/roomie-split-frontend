import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/SummaryCard";

function DashboardPage() {

    const [summary, setSummary] =
        useState(null);

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {

        const response =
            await api.get(
                "/dashboard/summary"
            );

        setSummary(
            response.data.data
        );
    };

    if (!summary) {
        return <h2>Loading...</h2>;
    }

    return (

        <MainLayout>

            <div
            style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap"
            }}
            >

            <SummaryCard
                title="🏠 House"
                value={summary.houseName}
            />

            <SummaryCard
                title="👥 Members"
                value={summary.memberCount}
            />

            <SummaryCard
                title="💸 Expenses"
                value={summary.totalExpenses}
            />

            <SummaryCard
                title="⏳ Pending"
                value={`₹${summary.pendingDues}`}
            />

        </div>

        </MainLayout>
    );
}

export default DashboardPage;
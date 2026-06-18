import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/SummaryCard";
import Loader from "../components/Loader";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

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
        return (
            <MainLayout>
                <Loader />
            </MainLayout>
        );
    }

    const financeData = [
        {
            name: "Pending Dues",
            value: summary.pendingDues
        },
        {
            name: "Settled Amount",
            value:
                summary.totalExpenseAmount -
                summary.pendingDues
        }
    ];

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

            <div className="
                bg-white
                rounded-xl
                shadow-md
                p-6
                mt-6
            ">

                <h2 className="
                    text-xl
                    font-semibold
                    mb-4
                ">
                    Financial Overview
                </h2>

                <div className="h-80">

                    <ResponsiveContainer>

                        <PieChart>

                            <Pie
                                data={financeData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >

                                <Cell fill="#ef4444" />

                                <Cell fill="#22c55e" />

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </MainLayout>
    );
}

export default DashboardPage;
import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
    getMyPaid
} from "../api/expenseApi";

function MyPaidPage() {

    const [paid, setPaid] =
        useState([]);

    useEffect(() => {

        loadPaid();

    }, []);

    const loadPaid = async () => {

        const data =
            await getMyPaid();

        setPaid(data);
    };

    return (

        <MainLayout>

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    My Paid Expenses
                </h1>

                <div className="space-y-4">

                    {paid.map((expense) => (

                        <div
                            key={expense.expenseId}
                            className="
                                bg-white
                                rounded-xl
                                shadow-md
                                p-5
                            "
                        >

                            <div className="flex justify-between items-center">

                                <div>

                                    <h3 className="text-lg font-semibold">
                                        {expense.expenseTitle}
                                    </h3>

                                    <p className="text-gray-500 mt-1">
                                        Paid To {expense.paidTo}
                                    </p>

                                </div>

                                <div className="text-right">

                                    <p className="
                                        text-2xl
                                        font-bold
                                        text-green-600
                                    ">
                                        ₹{expense.amount}
                                    </p>

                                    <span
                                        className="
                                            inline-block
                                            mt-2
                                            bg-green-100
                                            text-green-700
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        PAID
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                    {paid.length === 0 && (

                        <div className="
                            bg-white
                            rounded-xl
                            shadow-md
                            p-10
                            text-center
                            text-gray-500
                        ">
                            No settled expenses yet.
                        </div>

                    )}

                </div>

            </div>

        </MainLayout>
    );
}

export default MyPaidPage;
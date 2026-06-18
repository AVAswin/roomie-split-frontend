import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";

import {
    getMyDues,
    settleExpense
} from "../api/expenseApi";

function MyDuesPage() {

    const [dues, setDues] =
        useState([]);

    const loadDues = async () => {

        const data =
            await getMyDues();

        setDues(data);
    };

    useEffect(() => {

        loadDues();

    }, []);

   const handleSettle =
    async (expenseId) => {

        try {

            await settleExpense(
                expenseId
            );

            loadDues();

            toast.success(
                "Expense settled successfully!"
            );

        } catch (error) {

            toast.error(
                "Failed to settle expense"
            );
        }
    };

    return (

        <MainLayout>

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    My Dues
                </h1>

                <div className="space-y-4">

                    {dues.map((due) => (

                        <div
                            key={due.expenseId}
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
                                        {due.expenseTitle}
                                    </h3>

                                    <p className="text-gray-500 mt-1">
                                        Owed to {due.owedTo}
                                    </p>

                                </div>

                                <div className="text-right">

                                    <p className="
                                        text-2xl
                                        font-bold
                                        text-red-500
                                    ">
                                        ₹{due.amount}
                                    </p>

                                    <button
                                        onClick={() =>
                                            handleSettle(
                                                due.expenseId
                                            )
                                        }
                                        className="
                                            mt-2
                                            bg-green-600
                                            hover:bg-green-700
                                            text-white
                                            px-4
                                            py-2
                                            rounded-lg
                                            transition
                                        "
                                    >
                                        Settle
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                    {dues.length === 0 && (

                        <div className="
                            bg-white
                            rounded-xl
                            shadow-md
                            p-10
                            text-center
                            text-gray-500
                        ">
                            🎉 No pending dues!
                        </div>

                    )}

                </div>

            </div>

        </MainLayout>
    );
}

export default MyDuesPage;
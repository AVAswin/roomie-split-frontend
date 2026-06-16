import { useEffect, useState }
from "react";

import MainLayout
from "../layouts/MainLayout";

import {
    getMyPaid
}
from "../api/expenseApi";

function MyPaidPage() {

    const [paid,
        setPaid] =
        useState([]);

    useEffect(() => {

        loadPaid();

    }, []);

    const loadPaid =
        async () => {

            const data =
                await getMyPaid();

            setPaid(data);
        };

    return (

        <MainLayout>

            <h1>My Paid Expenses</h1>

            {
                paid.map(
                    expense => (

                        <div
                            key={
                                expense.expenseId
                            }
                            style={{
                                border:
                                    "1px solid #ddd",
                                padding:
                                    "1rem",
                                marginBottom:
                                    "1rem"
                            }}
                        >

                            <h3>
                                {
                                    expense.expenseTitle
                                }
                            </h3>

                            <p>
                                Paid To:
                                {" "}
                                {expense.paidTo}
                            </p>

                            <p>
                                ₹
                                {expense.amount}
                            </p>

                        </div>
                    )
                )
            }

        </MainLayout>
    );
}

export default MyPaidPage;
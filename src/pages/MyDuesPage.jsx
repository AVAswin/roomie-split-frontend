import { useEffect, useState }
from "react";

import MainLayout
from "../layouts/MainLayout";

import {
    getMyDues,
    settleExpense
}
from "../api/expenseApi";

function MyDuesPage() {

    const [dues,
        setDues] =
        useState([]);

    const loadDues =
        async () => {

            const data =
                await getMyDues();

            setDues(data);
        };

    useEffect(() => {

        loadDues();

    }, []);

    const handleSettle =
        async (expenseId) => {

            await settleExpense(
                expenseId
            );

            loadDues();
        };

    return (

        <MainLayout>

            <h1>My Dues</h1>

            {
                dues.map(
                    due => (

                        <div
                            key={
                                due.expenseId // this should be unique
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
                                    due.expenseTitle
                                }
                            </h3>

                            <p>
                                Owed To:
                                {" "}
                                {due.owedTo}
                            </p>

                            <p>
                                ₹
                                {due.amount}
                            </p>

                            <button
                                onClick={() =>
                                    handleSettle(
                                        due.expenseId
                                    )
                                }
                            >
                                Settle
                            </button>

                        </div>
                    )
                )
            }

        </MainLayout>
    );
}

export default MyDuesPage;
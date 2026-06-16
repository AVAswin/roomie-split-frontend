import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getExpenses,  createExpense } from "../api/expenseApi";

function ExpensesPage() {

    const [expenses, setExpenses] =
        useState([]);

    const [title, setTitle] =
    useState("");

    const [description,
        setDescription] =
        useState("");

    const [amount, setAmount] =
        useState("");

    useEffect(() => {

        loadExpenses();

    }, []);

    const loadExpenses =
        async () => {

            const data =
                await getExpenses();

            setExpenses(data);
        };

    return (

        <MainLayout>

            <h1>Expenses</h1>

            {
                expenses.map(
                    expense => (

                        <div
                            key={expense.id}
                            style={{
                                border:
                                    "1px solid #ddd",
                                padding: "1rem",
                                marginBottom:
                                    "1rem"
                            }}
                        >

                            <h3>
                                {expense.title}
                            </h3>

                            <p>
                                ₹
                                {expense.amount}
                            </p>

                            <p>
                                Paid By:
                                {" "}
                                {
                                    expense.paidBy
                                }
                            </p>

                        </div>
                    )
                )
            }

            <form
                onSubmit={
                    async (e) => {

                        e.preventDefault();

                        await createExpense({

                            title,

                            description,

                            amount
                        });

                        loadExpenses();

                        setTitle("");
                        setDescription("");
                        setAmount("");
                    }
                }
            >

                <input
                    placeholder="Title"
                    value={title}
                    onChange={e =>
                        setTitle(
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Description"
                    value={description}
                    onChange={e =>
                        setDescription(
                            e.target.value
                        )
                    }
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={e =>
                        setAmount(
                            e.target.value
                        )
                    }
                />

                <button type="submit">
                    Add Expense
                </button>

            </form>
        </MainLayout>
    );
}

export default ExpensesPage;
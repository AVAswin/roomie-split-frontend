import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getExpenses, createExpense } from "../api/expenseApi";

function ExpensesPage() {

    const [expenses, setExpenses] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses = async () => {
        const data = await getExpenses();
        setExpenses(data);
    };

    const handleSubmit = async (e) => {

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
    };

    return (
        <MainLayout>

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    Expenses
                </h1>

                {/* Create Expense Card */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                    <h2 className="text-xl font-semibold mb-4">
                        Add Expense
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            placeholder="Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="
                                w-full
                                border
                                rounded-lg
                                p-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                        <input
                            placeholder="Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            className="
                                w-full
                                border
                                rounded-lg
                                p-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) =>
                                setAmount(e.target.value)
                            }
                            className="
                                w-full
                                border
                                rounded-lg
                                p-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                        <button
                            type="submit"
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-6
                                py-3
                                rounded-lg
                                transition
                            "
                        >
                            Add Expense
                        </button>

                    </form>

                </div>

                {/* Expense List */}
                <div className="space-y-4">

                    {expenses.map((expense) => (

                        <div
                            key={expense.id}
                            className="
                                bg-white
                                rounded-xl
                                shadow-md
                                p-5
                            "
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <h3 className="text-lg font-semibold">
                                        {expense.title}
                                    </h3>

                                    {expense.description && (
                                        <p className="text-gray-500 mt-1">
                                            {expense.description}
                                        </p>
                                    )}

                                    <p className="text-sm text-gray-500 mt-3">
                                        Paid by {expense.paidBy}
                                    </p>

                                </div>

                                <div>

                                    <span className="
                                        text-2xl
                                        font-bold
                                        text-green-600
                                    ">
                                        ₹{expense.amount}
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                    {expenses.length === 0 && (

                        <div className="
                            bg-white
                            rounded-xl
                            shadow-md
                            p-10
                            text-center
                            text-gray-500
                        ">
                            No expenses added yet.
                        </div>

                    )}

                </div>

            </div>

        </MainLayout>
    );
}

export default ExpensesPage;
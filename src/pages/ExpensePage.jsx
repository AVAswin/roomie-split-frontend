import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
    getExpenses,
    createExpense
} from "../api/expenseApi";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function ExpensesPage() {

    const [expenses, setExpenses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [showModal, setShowModal] =
        useState(false);

    const [creating, setCreating] =
        useState(false);

    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [amount, setAmount] =
        useState("");

    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses =
        async () => {

            try {

                const data =
                    await getExpenses();

                setExpenses(data);

            } catch (error) {

                toast.error(
                    "Failed to load expenses."
                );

            } finally {

                setLoading(false);

            }

        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            if (
                !title ||
                !amount
            ) {

                toast.error(
                    "Title and amount are required."
                );

                return;
            }

            try {

                setCreating(true);

                await createExpense({

                    title,

                    description,

                    amount

                });

                toast.success(
                    "Expense added successfully!"
                );

                setShowModal(false);

                setTitle("");

                setDescription("");

                setAmount("");

                loadExpenses();

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||

                    "Failed to create expense."
                );

            } finally {

                setCreating(false);

            }

        };

    return (

    <MainLayout>

        <div className="max-w-5xl mx-auto">

            {/* Header */}

            <div className="
                flex
                justify-between
                items-center
                mb-8
            ">

                <div>

                    <h1 className="
                        text-3xl
                        font-bold
                    ">
                        💸 Expenses
                    </h1>

                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Manage your shared expenses
                    </p>

                </div>

                <button

                    onClick={() =>
                        setShowModal(true)
                    }

                    className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        font-semibold
                        px-6
                        py-3
                        rounded-xl
                        shadow-md
                        hover:shadow-lg
                        transition
                    "

                >

                    + Add Expense

                </button>

            </div>

            {/* Loading */}

            {

                loading && (

                    <div className="
                        bg-white
                        rounded-xl
                        shadow
                        p-10
                        text-center
                    ">

                        <Loader />

                    </div>

                )

            }

            {/* Empty State */}

            {

                !loading &&
                expenses.length === 0 && (

                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        p-14
                        text-center
                    ">

                        <div className="
                            text-6xl
                            mb-4
                        ">
                            💸
                        </div>

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-2
                        ">
                            No Expenses Yet
                        </h2>

                        <p className="
                            text-gray-500
                            mb-8
                        ">
                            Start tracking shared expenses by adding your first one.
                        </p>

                        <button

                            onClick={() =>
                                setShowModal(true)
                            }

                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-6
                                py-3
                                rounded-lg
                            "

                        >

                            Add Expense

                        </button>

                    </div>

                )

            }

            {/* Expense List */}

            <div className="space-y-5">

                {

                    expenses.map(

                        expense => (

                            <div

                                key={expense.id}

                                className="
                                    bg-white
                                    rounded-2xl
                                    shadow
                                    hover:shadow-xl
                                    transition-all
                                    duration-200
                                    p-6
                                "

                            >

                                <div className="
                                    flex
                                    justify-between
                                    items-start
                                ">

                                    <div>

                                        <h2 className="
                                            text-xl
                                            font-semibold
                                        ">

                                            💳 {expense.title}

                                        </h2>

                                        {

                                            expense.description && (

                                                <p className="
                                                    text-gray-500
                                                    mt-2
                                                ">

                                                    {expense.description}

                                                </p>

                                            )

                                        }

                                    </div>

                                    <div className="
                                        text-2xl
                                        font-bold
                                        text-green-600
                                    ">

                                        ₹{expense.amount}

                                    </div>

                                </div>

                                <div className="
                                    border-t
                                    mt-5
                                    pt-4
                                    flex
                                    justify-between
                                    items-center
                                    text-sm
                                ">

                                    <span className="
                                        text-gray-500
                                    ">

                                        Paid by

                                        <span className="
                                            ml-1
                                            font-semibold
                                            text-gray-700
                                        ">

                                            {expense.paidBy}

                                        </span>

                                    </span>

                                    <span className="
                                        text-blue-600
                                        font-medium
                                    ">

                                        Split Equally

                                    </span>

                                </div>

                            </div>

                        )

                    )

                }

            </div>

            {/* Add Expense Modal */}

            {

                showModal && (

                    <div className="
                        fixed
                        inset-0
                        bg-black/40
                        flex
                        items-center
                        justify-center
                        z-50
                    ">

                        <div className="
                            bg-white
                            rounded-2xl
                            shadow-xl
                            w-[450px]
                            p-8
                        ">

                            <h2 className="
                                text-2xl
                                font-bold
                                mb-6
                            ">

                                Add Expense

                            </h2>

                            <form
                                onSubmit={handleSubmit}
                            >

                                <input

                                    placeholder="Expense Title"

                                    value={title}

                                    onChange={(e) =>
                                        setTitle(
                                            e.target.value
                                        )
                                    }

                                    className="
                                        w-full
                                        border
                                        rounded-lg
                                        px-4
                                        py-3
                                        mb-4
                                    "

                                />

                                <textarea

                                    placeholder="Description"

                                    value={description}

                                    onChange={(e) =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }

                                    rows={4}

                                    className="
                                        w-full
                                        border
                                        rounded-lg
                                        px-4
                                        py-3
                                        mb-4
                                    "

                                />

                                <input

                                    type="number"

                                    placeholder="Amount"

                                    value={amount}

                                    onChange={(e) =>
                                        setAmount(
                                            e.target.value
                                        )
                                    }

                                    className="
                                        w-full
                                        border
                                        rounded-lg
                                        px-4
                                        py-3
                                        mb-6
                                    "

                                />

                                <div className="
                                    flex
                                    justify-end
                                    gap-3
                                ">

                                    <button

                                        type="button"

                                        onClick={() =>
                                            setShowModal(false)
                                        }

                                        className="
                                            border
                                            rounded-lg
                                            px-5
                                            py-2
                                        "

                                    >

                                        Cancel

                                    </button>

                                    <button

                                        type="submit"

                                        disabled={creating}

                                        className="
                                            bg-blue-600
                                            hover:bg-blue-700
                                            text-white
                                            rounded-lg
                                            px-5
                                            py-2
                                            disabled:opacity-50
                                        "

                                    >

                                        {

                                            creating

                                                ?

                                                "Adding..."

                                                :

                                                "Add Expense"

                                        }

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )

            }

        </div>

    </MainLayout>

);
}

export default ExpensesPage;
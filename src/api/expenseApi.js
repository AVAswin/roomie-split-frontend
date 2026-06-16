import api from "./axios";

export const getExpenses = async () => {

    const response =
        await api.get("/expenses");

    return response.data.data;
};

export const createExpense =
    async (expense) => {

        const response =
            await api.post(
                "/expenses",
                expense
            );

        return response.data.data;
};

export const getMyDues =
    async () => {

        const response =
            await api.get(
                "/expenses/my-dues"
            );

        return response.data.data;
};

export const getMyPaid =
    async () => {

        const response =
            await api.get(
                "/expenses/my-paid"
            );

        return response.data.data;
};

export const settleExpense =
    async (expenseId) => {

        await api.post(
            `/expenses/${expenseId}/settle`
        );
};
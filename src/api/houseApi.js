import api from "./axios";

export const getMyHouse = async () => {

    const response =
        await api.get("/houses/me");

    return response.data.data;
};

export const getHouseMembers = async () => {

    const response =
        await api.get(
            "/houses/me/members"
        );

    return response.data.data;
};

export const createHouse = async (name) => {

    const response =
        await api.post(
            "/houses",
            {
                name
            }
        );

    return response.data.data;
};

export const joinHouse = async (inviteCode) => {

    await api.post(
        "/houses/join",
        {
            inviteCode
        }
    );
};
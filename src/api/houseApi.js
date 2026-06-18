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
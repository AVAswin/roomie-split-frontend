import api from "./axios";

export const getNotifications =
    async () => {

        const response =
            await api.get(
                "/notifications"
            );

        return response.data.data;
    };

export const getUnreadCount =
    async () => {

        const response =
            await api.get(
                "/notifications/unread-count"
            );

        return response.data.data;
    };

export const markAsRead =
    async (notificationId) => {

        await api.patch(
            `/notifications/${notificationId}/read`
        );
    };
import { useEffect, useState }
from "react";

import MainLayout
from "../layouts/MainLayout";

import {
    getNotifications,
    markAsRead
}
from "../api/notificationApi";

function NotificationsPage() {

    const [notifications,
        setNotifications] =
        useState([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications =
        async () => {

            const data =
                await getNotifications();

            setNotifications(data);
        };

    const handleRead =
        async (id) => {

            await markAsRead(id);

            loadNotifications();
        };

    return (

        <MainLayout>

            <div className="max-w-5xl mx-auto">

                <h1 className="
                    text-3xl
                    font-bold
                    mb-6
                ">
                    Notifications
                </h1>

                <div className="space-y-4">

                    {
                        notifications.map(
                            notification => (

                                <div
                                    key={
                                        notification.id
                                    }
                                    className={`
                                        rounded-xl
                                        shadow-md
                                        p-5
                                        bg-white

                                        ${
                                            !notification.isRead
                                            ? "border-l-4 border-blue-500"
                                            : ""
                                        }
                                    `}
                                >

                                    <div
                                        className="
                                            flex
                                            justify-between
                                            items-start
                                        "
                                    >

                                        <div>

                                            <h3
                                                className="
                                                    font-semibold
                                                "
                                            >
                                                {
                                                    notification.title
                                                }
                                            </h3>

                                            <p
                                                className="
                                                    text-gray-600
                                                    mt-1
                                                "
                                            >
                                                {
                                                    notification.message
                                                }
                                            </p>

                                        </div>

                                        {
                                            !notification.isRead && (

                                                <button
                                                    onClick={() =>
                                                        handleRead(
                                                            notification.id
                                                        )
                                                    }
                                                    className="
                                                        bg-blue-600
                                                        text-white
                                                        px-3
                                                        py-1
                                                        rounded
                                                    "
                                                >
                                                    Mark Read
                                                </button>

                                            )
                                        }

                                    </div>

                                </div>

                            )
                        )
                    }

                    {
                        notifications.length === 0 && (

                            <div
                                className="
                                    bg-white
                                    rounded-xl
                                    shadow-md
                                    p-10
                                    text-center
                                    text-gray-500
                                "
                            >
                                No notifications
                            </div>

                        )
                    }

                </div>

            </div>

        </MainLayout>
    );
}

export default NotificationsPage;
import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { getMyHouse } from "../api/houseApi";
import { toast } from "react-toastify";

function HousePage() {

    const [house, setHouse] =
        useState(null);

    useEffect(() => {

        loadHouse();

    }, []);

    const copyInviteCode =
    async () => {

        try {

            await navigator.clipboard
                .writeText(
                    house.inviteCode
                );

            toast.success(
                "Invite code copied!"
            );

        } catch (error) {

            toast.error(
                "Failed to copy code"
            );
        }
    };

    const loadHouse = async () => {

        try {

            const data =
                await getMyHouse();

            setHouse(data);

        } catch (error) {

            console.error(error);
        }
    };

    if (!house) {

        return (

            <MainLayout>

                <div className="
                    max-w-5xl
                    mx-auto
                ">
                    Loading...
                </div>

            </MainLayout>

        );
    }

    return (

        <MainLayout>

            <div className="
                max-w-5xl
                mx-auto
            ">

                <h1 className="
                    text-3xl
                    font-bold
                    mb-6
                ">
                    My House
                </h1>

                {/* House Card */}

                <div className="
                    bg-white
                    rounded-xl
                    shadow-md
                    p-6
                    mb-6
                ">

                    <h2 className="
                        text-2xl
                        font-semibold
                    ">
                        🏠 {house.houseName}
                    </h2>

                    <p className="
                        text-gray-500
                        mt-2
                    ">
                        Owner: {house.owner}
                    </p>

                    <div className="mt-6">

                        <p className="
                            text-gray-500
                        ">
                            Invite Code
                        </p>

                        <div className="
                            inline-block
                            mt-2
                            bg-blue-100
                            text-blue-700
                            px-4
                            py-2
                            rounded-lg
                            font-bold
                            tracking-wider
                        ">
                            {house.inviteCode}
                        </div>

                        <button
                            onClick={copyInviteCode}
                            className="
                                ml-3
                                bg-slate-200
                                px-3
                                py-2
                                rounded-lg
                            "
                        >
                            Copy
                        </button>

                    </div>
                    

                </div>

                {/* Members */}

                <div className="
                    bg-white
                    rounded-xl
                    shadow-md
                    p-6
                ">

                    <h2 className="
                        text-xl
                        font-semibold
                        mb-4
                    ">
                        Members ({house.members.length})
                    </h2>

                    <div className="
                        space-y-3
                    ">

                        {house.members.map(
                            member => (

                                <div
                                    key={member.id}
                                    className="
                                        flex
                                        justify-between
                                        items-center
                                        border-b
                                        pb-3
                                    "
                                >

                                    <div>

                                        <p className="
                                            font-medium
                                        ">
                                            👤 {member.name}
                                        </p>

                                        <p className="
                                            text-sm
                                            text-gray-500
                                        ">
                                            {member.email}
                                        </p>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </div>

        </MainLayout>
    );
}

export default HousePage;
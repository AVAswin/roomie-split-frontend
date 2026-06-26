import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
    getMyHouse,
    createHouse,
    joinHouse
} from "../api/houseApi";

import { toast } from "react-toastify";
import Loader from "../components/Loader";

function HousePage() {

    const [house, setHouse] =
    useState(null);

    const [loading, setLoading] =
        useState(true);

    const [showCreateModal, setShowCreateModal] =
        useState(false);

    const [showJoinModal, setShowJoinModal] =
        useState(false);

    const [houseName, setHouseName] =
        useState("");

    const [inviteCode, setInviteCode] =
        useState("");

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

            setHouse(null);

        } finally {

            setLoading(false);

        }

    };

    const handleCreateHouse =
    async () => {

        if (!houseName.trim()) {

            toast.error(
                "Enter house name"
            );

            return;
        }

        try {

            await createHouse(
                houseName
            );

            toast.success(
                "House created successfully"
            );

            setShowCreateModal(false);

            setHouseName("");

            loadHouse();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create house"
            );
        }

    };

    const handleJoinHouse =
        async () => {

            if (!inviteCode.trim()) {

                toast.error(
                    "Enter invite code"
                );

                return;
            }

            try {

                await joinHouse(
                    inviteCode
                );

                toast.success(
                    "Joined house successfully"
                );

                setShowJoinModal(false);

                setInviteCode("");

                loadHouse();

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to join house"
                );
            }

        };

    if (loading) {

        return (

        <MainLayout>

            <div className="
                flex
                justify-center
                items-center" >
              <Loader />
            </div>

        </MainLayout>

    );

}

    if (!house) {

        return (

            <MainLayout>

                <div className="max-w-xl mx-auto mt-16">

                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-lg
                        p-10
                        text-center
                    ">

                        <div className="text-6xl mb-4">
                            🏠
                        </div>

                        <h1 className="
                            text-3xl
                            font-bold
                            mb-3
                        ">
                            Welcome to RoomieSplit
                        </h1>

                        <p className="
                            text-gray-500
                            mb-8
                        ">
                            You are not part of any house yet.
                            Create a new house or join one using an invite code.
                        </p>

                        <div className="
                            flex
                            justify-center
                            gap-4
                        ">

                            <button
                                onClick={() =>
                                    setShowCreateModal(true)
                                }
                                className="
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    px-6
                                    py-3
                                    rounded-lg
                                    font-medium
                                "
                            >
                                + Create House
                            </button>

                            <button
                                onClick={() =>
                                    setShowJoinModal(true)
                                }
                                className="
                                    border
                                    border-blue-600
                                    text-blue-600
                                    hover:bg-blue-50
                                    px-6
                                    py-3
                                    rounded-lg
                                    font-medium
                                "
                            >
                                Join House
                            </button>

                        </div>

                    </div>

                </div>

                {/* Create Modal */}

                {
                    showCreateModal && (

                        <div className="
                            fixed
                            inset-0
                            bg-black/40
                            flex
                            items-center
                            justify-center
                        ">

                            <div className="
                                bg-white
                                rounded-xl
                                p-8
                                w-96
                            ">

                                <h2 className="
                                    text-2xl
                                    font-bold
                                    mb-5
                                ">
                                    Create House
                                </h2>

                                <input

                                    type="text"

                                    placeholder="House Name"

                                    value={houseName}

                                    onChange={(e) =>
                                        setHouseName(
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

                                        onClick={() =>
                                            setShowCreateModal(false)
                                        }

                                        className="
                                            px-5
                                            py-2
                                            rounded-lg
                                            border
                                        "
                                    >
                                        Cancel
                                    </button>

                                    <button

                                        onClick={
                                            handleCreateHouse
                                        }

                                        className="
                                            bg-blue-600
                                            text-white
                                            px-5
                                            py-2
                                            rounded-lg
                                        "
                                    >
                                        Create
                                    </button>

                                </div>

                            </div>

                        </div>

                    )
                }

                {/* Join Modal */}

                {
                    showJoinModal && (

                        <div className="
                            fixed
                            inset-0
                            bg-black/40
                            flex
                            items-center
                            justify-center
                        ">

                            <div className="
                                bg-white
                                rounded-xl
                                p-8
                                w-96
                            ">

                                <h2 className="
                                    text-2xl
                                    font-bold
                                    mb-5
                                ">
                                    Join House
                                </h2>

                                <input

                                    type="text"

                                    placeholder="Invite Code"

                                    value={inviteCode}

                                    onChange={(e) =>
                                        setInviteCode(
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

                                        onClick={() =>
                                            setShowJoinModal(false)
                                        }

                                        className="
                                            px-5
                                            py-2
                                            rounded-lg
                                            border
                                        "
                                    >
                                        Cancel
                                    </button>

                                    <button

                                        onClick={
                                            handleJoinHouse
                                        }

                                        className="
                                            bg-green-600
                                            text-white
                                            px-5
                                            py-2
                                            rounded-lg
                                        "
                                    >
                                        Join
                                    </button>

                                </div>

                            </div>

                        </div>

                    )
                }

            </MainLayout>

        );

    }

    return (

    <MainLayout>

        <div className="max-w-7xl mx-auto">

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
                        My House
                    </h1>

                    <p className="
                        text-gray-500
                        mt-2
                    ">
                        Manage your house and members
                    </p>

                </div>

            </div>

            {/* Two Column Layout */}

            <div className="
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-6
            ">

                {/* LEFT SIDE */}

                <div className="
                    lg:col-span-1
                ">

                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        p-7
                    ">

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-6
                        ">
                            {house.houseName}
                        </h2>

                        {/* Owner */}

                        <div className="
                            mb-6
                        ">

                            <p className="
                                text-gray-500
                                text-sm
                            ">
                                House Owner
                            </p>

                            <p className="
                                font-semibold
                                mt-1
                            ">
                                {house.owner}
                            </p>

                        </div>

                        {/* Members Count */}

                        <div className="
                            mb-6
                        ">

                            <p className="
                                text-gray-500
                                text-sm
                            ">
                                Members
                            </p>

                            <p className="
                                text-2xl
                                font-bold
                                mt-1
                                text-blue-600
                            ">
                                {house.members.length}
                            </p>

                        </div>

                        {/* Invite Code */}

                        <div>

                            <p className="
                                text-gray-500
                                text-sm
                                mb-2
                            ">
                                Invite Code
                            </p>

                            <div className="
                                flex
                                items-center
                                justify-between
                                bg-slate-100
                                rounded-xl
                                px-4
                                py-3
                            ">

                                <span className="
                                    font-bold
                                    tracking-widest
                                    text-lg
                                ">
                                    {house.inviteCode}
                                </span>

                                <button

                                    onClick={copyInviteCode}

                                    className="
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                    "

                                >
                                    Copy
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                                {/* RIGHT SIDE */}

                <div className="lg:col-span-2">

                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        p-7
                    ">

                        <div className="
                            flex
                            justify-between
                            items-center
                            mb-6
                        ">

                            <div>

                                <h2 className="
                                    text-2xl
                                    font-bold
                                ">
                                    Members
                                </h2>

                                <p className="
                                    text-gray-500
                                    mt-1
                                ">
                                    {house.members.length} members in this house
                                </p>

                            </div>

                        </div>

                        <div className="space-y-4">

                            {house.members.map((member) => (

                                <div
                                    key={member.id}
                                    className="
                                        flex
                                        justify-between
                                        items-center
                                        p-5
                                        rounded-xl
                                        border
                                        hover:bg-slate-50
                                        transition
                                    "
                                >

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                    ">

                                        <div className="
                                            w-12
                                            h-12
                                            rounded-full
                                            bg-blue-600
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            font-bold
                                            text-lg
                                        ">
                                            {member.name.charAt(0).toUpperCase()}
                                        </div>

                                        <div>

                                            <h3 className="
                                                font-semibold
                                                text-lg
                                            ">
                                                {member.name}
                                            </h3>

                                            <p className="
                                                text-gray-500
                                                text-sm
                                            ">
                                                {member.email}
                                            </p>

                                        </div>

                                    </div>

                                    {member.email === house.owner && (

                                        <span className="
                                            bg-blue-100
                                            text-blue-700
                                            text-xs
                                            font-semibold
                                            px-3
                                            py-1
                                            rounded-full
                                        ">
                                            Owner
                                        </span>

                                    )}

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div> {/* End Grid */}

        </div> {/* End Container */}

    </MainLayout>

);

}

export default HousePage;
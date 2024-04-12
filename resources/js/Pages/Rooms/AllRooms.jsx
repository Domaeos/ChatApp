import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import PopupJoinRoom from "@/Components/PopupJoinRoom";
import { Button } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import { router } from "@inertiajs/react";

export default function AllRooms({ auth, rooms, flash }) {
    const [showPopup, setShowPopup] = useState(false);
    const [currentSelection, setCurrentSelection] = useState({});

    useEffect(() => {
        setShowPopup(false);
        router.reload({ only: ["rooms"] });
        if (flash?.message) {
            if (flash?.status === "success") {
                toast.success(flash.message, {
                    duration: 4000,
                    position: "bottom-center",
                });
            } else if (flash?.status === "error") {
                toast.error(flash.message, {
                    duration: 4000,
                    position: "bottom-center",
                });
            }
        }
    }, [flash]);

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Find a room" />
                <PopupJoinRoom
                    room={currentSelection}
                    show={showPopup}
                    onHide={() => setShowPopup(false)}
                />
                {/* // Replace with loading component later */}
                {!rooms && <h1>Loading rooms..</h1>}
                {rooms && (
                    <div className="flex-1 justify-items-center justify-content-center">
                        {/* <input type="text"></input> */}
                        <ul>
                            {rooms &&
                                rooms.map((room, index) => {
                                    return (
                                        <li key={`${index}-${room.name}`}>
                                            {room.name}: {room.description}
                                            <Button
                                                onClick={() => {
                                                    setCurrentSelection(room);
                                                    setShowPopup(true);
                                                }}
                                            >
                                                Show Details
                                            </Button>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                )}
                <div>
                    <Toaster />
                </div>
            </AuthenticatedLayout>
        </>
    );
}

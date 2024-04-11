import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import PopupJoinRoom from "@/Components/PopupJoinRoom";
import { Button } from "react-bootstrap";

export default function AllRooms({ auth, rooms }) {
    const [showPopup, setShowPopup] = useState(false);
    console.log(rooms);
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Find a room" />
                <PopupJoinRoom
                    show={showPopup}
                    onHide={() => setShowPopup(false)}
                />
                <div className="flex-1 justify-items-center justify-content-center">
                    {/* <input type="text"></input> */}
                    <ul>
                        {rooms &&
                            rooms.map((room, index) => {
                                return (
                                    <li key={`${index}-${room.name}`}>
                                        {room.name}: {room.description}
                                        <Button
                                            onClick={() => setShowPopup(true)}
                                        >
                                            Show Details
                                        </Button>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

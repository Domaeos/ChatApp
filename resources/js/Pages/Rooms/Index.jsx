import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import { router } from "@inertiajs/react";
import ChannelList from "@/Components/ChannelList";
import ChatRoom from "@/Components/ChatRoom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Index({ auth, flash, myRooms }) {
    const [currentRoom, setCurrentRoom] = useState(null);
    useEffect(() => {
        if (auth.user) {
            if (myRooms?.length) {
                setCurrentRoom(+myRooms[0].id);
            }
        }
    }, []);

    return (
        <>
            {!auth.user && (
                <Guest>
                    <h1>Login/Register to get started</h1>
                </Guest>
            )}
            {auth.user && (
                <div className="main-grid">
                    <AuthenticatedLayout user={auth.user}>
                        <Head title="Rooms" />
                        <div className="room-grid">
                            <ChannelList
                                setCurrentRoom={setCurrentRoom}
                                user={auth.user}
                            />
                            <ChatRoom currentRoom={currentRoom} />
                        </div>
                        <Toaster />
                    </AuthenticatedLayout>
                </div>
            )}
        </>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import ChannelList from "@/Components/ChannelList";
import ChatRoom from "@/Components/ChatRoom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import UserModal from "@/Components/UserModal";
import axios from "axios";
import { createContext } from "react";

export const MyRoomsContext = createContext([]);

export default function Index({ auth }) {
    const [modal, setModal] = useState({
        action: "",
        show: false,
    });
    const [roomsRefresh, setRoomsRefresh] = useState(false);
    const [myRooms, setMyRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    useEffect(() => {
        if (auth.user) {
            axios
                .get("/rooms/myrooms")
                .then((res) => setMyRooms(res.data))
                .catch((e) => console.log(e.response.data));
        }
    }, [roomsRefresh]);

    return (
        <>
            {!auth.user && (
                <Guest>
                    <h1>Login/Register to get started</h1>
                </Guest>
            )}
            {auth.user && (
                <MyRoomsContext.Provider value={myRooms}>
                    <div className="main-grid">
                        <AuthenticatedLayout user={auth.user}>
                            <Head title="Rooms" />
                            <div className="room-grid">
                                <ChannelList
                                    setModal={setModal}
                                    setCurrentRoom={setCurrentRoom}
                                    user={auth.user}
                                />
                                <ChatRoom currentRoom={currentRoom} />
                            </div>
                            <Toaster />
                        </AuthenticatedLayout>
                        <UserModal
                            modal={modal}
                            setRoomsRefresh={setRoomsRefresh}
                            setModal={setModal}
                        />
                    </div>
                </MyRoomsContext.Provider>
            )}
        </>
    );
}

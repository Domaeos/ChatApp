import { useState } from "react";
import ChatOutput from "./ChatOutput";
import ChatHeader from "./ChatHeader";
import axios from "axios";
import { toast } from "react-hot-toast";
import ChatInput from "./ChatInput";
import EventHandler from "@/Pages/Events/EventHandler";
import { useEffect } from "react";
import { useContext } from "react";
import { MyRoomsContext } from "@/Pages/Rooms/Index";

export default function ChatRoom({ currentRoom }) {
    const myRooms = useContext(MyRoomsContext);
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [roomNumberToRefresh, setRoomNumberToRefresh] = useState(null);

    useEffect(() => {
        EventHandler(setRoomNumberToRefresh);
    }, []);

    function handleSubmit() {
        setSubmitting(true);
        axios
            .post(`/messages/${currentRoom}`, { message })
            .then(() => {
                setMessage("");
                setSubmitting(false);
            })
            .catch((e) => {
                toast.error("Something went wrong", {
                    position: "bottom-center",
                });
            });
    }
    return (
        <div className="chat-room-grid">
            <ChatHeader room={myRooms.find((x) => x.id === currentRoom)} />
            <ChatOutput
                roomNumberToRefresh={roomNumberToRefresh}
                currentRoom={currentRoom}
            />
            <ChatInput
                currentRoom={currentRoom}
                handleSubmit={handleSubmit}
                message={message}
                submitting={submitting}
                setMessage={setMessage}
            />
        </div>
    );
}

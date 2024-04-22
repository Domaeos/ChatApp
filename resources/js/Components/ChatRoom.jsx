import { useState } from "react";
import ChatOutput from "./ChatOutput";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import ChatInput from "./ChatInput";
import EventHandler from "@/Pages/Events/EventHandler";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function ChatRoom({ currentRoom }) {
    const { myRooms } = usePage().props;

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
            <ChatOutput
                roomNumberToRefresh={roomNumberToRefresh}
                currentRoom={currentRoom}
            />
            <ChatInput
                handleSubmit={handleSubmit}
                message={message}
                submitting={submitting}
                setMessage={setMessage}
            />
            <Button
                className="message-submit-button"
                onClick={handleSubmit}
                disabled={!message.length || submitting}
            >
                Submit
            </Button>
        </div>
    );
}

import { useState } from "react";
import TextInput from "./TextInput";
import ChatOutput from "./ChatOutput";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import { usePage } from "@inertiajs/react";
import ChatInput from "./ChatInput";

export default function ChatRoom({ currentRoom }) {
    const [message, setMessage] = useState("");
    function handleSubmit() {
        axios
            .post(`/messages/${currentRoom}`, { message })
            .then(() => {
                setMessage("");
            })
            .catch((e) => {
                toast.error("Something went wrong", {
                    position: "bottom-center",
                });
            });
    }
    return (
        <div className="chat-room-grid">
            <ChatOutput currentRoom={currentRoom} />
            <ChatInput message={message} setMessage={setMessage} />
            <Button onClick={handleSubmit} disabled={!message.length}>
                Submit
            </Button>
        </div>
    );
}

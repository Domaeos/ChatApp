import { useState } from "react";
import ChatOutput from "./ChatOutput";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import ChatInput from "./ChatInput";

export default function ChatRoom({ currentRoom }) {
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        axios
            .post(`/messages/${currentRoom}`, { message })
            .then(() => {
                setMessage("");
            })
            .catch((e) => {
                console.log(e);
                toast.error("Something went wrong", {
                    position: "bottom-center",
                });
            });
    }
    return (
        <div className="chat-room-grid">
            <ChatOutput currentRoom={currentRoom} />
            <ChatInput message={message} setMessage={setMessage} />
            <Form onSubmit={handleSubmit}>
                <Button type="submit" disabled={!message.length || submitting}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

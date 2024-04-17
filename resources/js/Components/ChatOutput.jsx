import dayjs from "dayjs";
import axios from "axios";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect } from "react";
import { useState } from "react";

dayjs.extend(relativeTime);

export default function ChatOutput({ currentRoom }) {
    const [messages, setMessages] = useState([]);
    console.log(currentRoom);

    useEffect(() => {
        if (currentRoom) {
            axios
                .get("/messages/" + currentRoom)
                .then((res) => {
                    console.log(res.data);
                    setMessages(res.data);
                })
                .catch((e) => {});
        }
    }, [currentRoom]);
    return (
        <div className="chatbox-grid">
            {messages?.map((message, index) => {
                return (
                    <div
                        className="single-chat-message"
                        key={message.user.id + index}
                    >
                        <div className="single-chat-header">
                            <div className="single-chat-author">
                                {message.user.name}
                            </div>
                            <span className="chat-message-date">
                                {dayjs(message.created_at).fromNow()}
                            </span>
                        </div>
                        <div className="chat-output-message">
                            {message.message}
                        </div>
                    </div>
                );
            })}
            {!currentRoom && <h1>You need to join a room</h1>}
        </div>
    );
}
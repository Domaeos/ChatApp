import dayjs from "dayjs";
import axios from "axios";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

dayjs.extend(relativeTime);

export default function ChatOutput({ currentRoom, roomNumberToRefresh }) {
    const prevRoom = useRef(currentRoom);
    const [messages, setMessages] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (prevRoom.current !== currentRoom) {
            prevRoom.current = currentRoom;
        } else {
            if (roomNumberToRefresh?.roomID !== currentRoom) {
                // Call not for this room
                return;
            }
        }
        if (currentRoom) {
            axios
                .get("/messages/" + currentRoom)
                .then((res) => {
                    setMessages(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [currentRoom, roomNumberToRefresh]);

    return (
        <div className="chatbox-flex">
            {messages?.map((message, index) => {
                return (
                    <div
                        className="single-chat-message"
                        key={message?.user.id + index}
                    >
                        <div className="single-chat-header">
                            <div className="single-chat-author">
                                {message?.user.name}
                            </div>
                            <span className="chat-message-date">
                                {dayjs(message?.created_at).fromNow()}
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

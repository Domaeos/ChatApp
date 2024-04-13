import Pusher from "pusher-js";
import { useEffect } from "react";
import { useState } from "react";

export default function EventTest() {
    const [eventMessage, setEventMessage] = useState("");

    var pusher = new Pusher("253a1d5cf5a2b33393e7", {
        cluster: "eu",
        encrypted: true,
        keepAlive: true,
    });
    var channel = pusher.subscribe("my-channel");

    useEffect(() => {
        console.log(eventMessage);
    }, [eventMessage]);

    channel.bind("my-event", (data) => {
        setEventMessage(data);
    });

    return <h1>In Events Test Page</h1>;
}

import Pusher from "pusher-js";

export default function EventHandler(setRoomNumberToRefresh) {
    var pusher = new Pusher("253a1d5cf5a2b33393e7", {
        cluster: "eu",
        encrypted: true,
        keepAlive: true,
    });
    var channel = pusher.subscribe("channel-info");

    channel.bind("new-message", (data) => {
        setRoomNumberToRefresh({ roomID: +data.message.room_id });
    });
}

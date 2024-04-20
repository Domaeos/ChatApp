import Pusher from "pusher-js";

export default function EventHandler(currentRoom, setRefresh) {
    let timeOutCheck = false;
    var pusher = new Pusher("253a1d5cf5a2b33393e7", {
        cluster: "eu",
        encrypted: true,
        keepAlive: true,
    });
    var channel = pusher.subscribe("channel-info");

    channel.bind("new-message", (data) => {
        console.log("new message triggered");
        console.log(currentRoom);
        if (+currentRoom === data.room_id && !timeOutCheck) {
            // Refresh or get single message and append to state in chatoutput?
            // For now just trigger refresh of all messages
            console.log("Received socket call");
            setRefresh((refresh) => !refresh);
            timeOutCheck = true;
            setTimeout(() => {
                timeOutCheck = false;
            }, 500);
        }
    });
}

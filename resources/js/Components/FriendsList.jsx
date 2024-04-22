import { useState } from "react";

export default function FriendsList() {
    const [friends, setFriends] = useState([1, 2, 3, 4, 5]);

    return (
        <>
            {friends.map((x, i) => {
                return <div>{i}</div>;
            })}
        </>
    );
}

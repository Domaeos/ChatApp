import { router } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import FindRooms from "./FindRooms";
import { Button } from "react-bootstrap";
export default function ChannelList({ setCurrentRoom }) {
    const { myRooms } = usePage().props;
    console.log(myRooms);

    function handleRoomChange(id) {
        setCurrentRoom(+id);
    }

    function handleFind(e) {
        console.log("finding");
    }

    return (
        <>
            <div className="side-grid">
                {myRooms.length &&
                    myRooms?.map((room, index) => {
                        return (
                            <span
                                onClick={() => handleRoomChange(room.id)}
                                key={index + room}
                            >
                                :{room.name}
                            </span>
                        );
                    })}
                {!myRooms?.length && (
                    <Button onClick={handleFind}>Find a room</Button>
                )}
            </div>
        </>
    );
}

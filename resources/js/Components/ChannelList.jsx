import { router } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import FindRooms from "./FindRooms";
import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { Accordion } from "react-bootstrap";

export default function ChannelList({ setCurrentRoom }) {
    const { myRooms } = usePage().props;
    console.log(myRooms);

    function handleRoomChange(id) {
        setCurrentRoom(+id);
    }

    function handleFind(e) {
        //
    }

    return (
        <>
            <div className="side-grid">
                <div className="side-grid-rooms">
                    <div className="side-grid-header rooms">Rooms</div>
                    <div className="side-grid-list">
                        <Accordion defaultActiveKey={0} alwaysOpen flush={true}>
                            {myRooms.length &&
                                myRooms?.map((room, index) => {
                                    return (
                                        <Accordion.Item eventKey={index}>
                                            <Accordion.Header
                                                key={index + room}
                                                action
                                                onClick={() =>
                                                    handleRoomChange(room.id)
                                                }
                                            >
                                                {room.name}
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                Rooms
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    );
                                })}
                        </Accordion>
                        {!myRooms?.length && (
                            <Button onClick={handleFind}>Find a room</Button>
                        )}
                    </div>
                </div>
                <div className="side-grid-header friends">Friends</div>
            </div>
        </>
    );
}

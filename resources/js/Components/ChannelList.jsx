import { usePage } from "@inertiajs/react";
import FindRooms from "./FindRooms";
import { Button } from "react-bootstrap";
import { Accordion } from "react-bootstrap";

export default function ChannelList({ setCurrentRoom }) {
    const { myRooms } = usePage().props;

    function handleRoomChange(id) {
        setCurrentRoom((oldID) => {
            if (oldID !== +id) {
                return +id;
            } else {
                return oldID;
            }
        });
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
                        <Accordion
                            className="room-accordion"
                            variant="secondary"
                            defaultActiveKey={0}
                            alwaysOpen
                            flush
                        >
                            {myRooms.length &&
                                myRooms?.map((room, index) => {
                                    return (
                                        <Accordion.Item
                                            key={index + room.name}
                                            eventKey={index}
                                        >
                                            <Accordion.Header
                                                onClick={() =>
                                                    handleRoomChange(room.id)
                                                }
                                            >
                                                {room.name}
                                            </Accordion.Header>
                                            {/* <Accordion.Body>
                                                Channels
                                            </Accordion.Body> */}
                                        </Accordion.Item>
                                    );
                                })}
                        </Accordion>
                        {!myRooms?.length && (
                            <Button onClick={handleFind}>Find a room</Button>
                        )}
                    </div>
                </div>
                {/* <div className="side-grid-header friends">Friends</div> */}
            </div>
        </>
    );
}

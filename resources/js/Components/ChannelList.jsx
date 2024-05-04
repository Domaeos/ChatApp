import { usePage } from "@inertiajs/react";
import { Button } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import FriendsList from "./FriendsList";

export default function ChannelList({ setCurrentRoom, setModal }) {
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
        setModal((modal) => {
            return { show: true, action: "Find a room" };
        });
    }

    return (
        <>
            <div className="side-grid">
                <div className="side-grid-rooms">
                    <div className="side-grid-header rooms">
                        <div className="header">Rooms</div>
                        <div className="header-room-actions">
                            <Button
                                variant="secondary"
                                onClick={handleFind}
                                size="small"
                            >
                                Find
                            </Button>
                        </div>
                    </div>
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
                            <div>Uh oh - no rooms! Join a room at the top</div>
                        )}
                    </div>
                </div>
                <div className="side-grid-friends">
                    <div className="side-grid-header friends">Friends</div>
                    <div className="side-grid-friends-grid">
                        <FriendsList />
                    </div>
                </div>
            </div>
        </>
    );
}

import { Button } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Members from "./Members";
import LeaveModal from "./LeaveRoomModal";

export default function ChatHeader({ room }) {
    console.log(room);
    const [members, setMembers] = useState([]);
    const [showLeaveModal, setShowLeaveModal] = useState(false);

    const [showMembers, setShowMembers] = useState(false);
    useEffect(() => {
        if (room) {
            axios
                .get(`/rooms/${room.id}/members`)
                .then((res) => {
                    setMembers(res.data);
                })
                .catch((e) => console.log(e.response));
        }
    }, [room]);

    return (
        <div className="chat-room-header">
            <div className="chat-room-name">
                {room?.name ? room.name : "Please join a room"}
            </div>
            <div className="chat-room-header-actions">
                {room && (
                    <Button variant="info" onClick={() => setShowMembers(true)}>
                        Members
                    </Button>
                )}
            </div>

            <Offcanvas
                show={showMembers}
                onHide={() => setShowMembers(false)}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        {room?.name ?? "Room info"}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="room-menu-body">
                        <div className="room-menu-members">
                            <Members members={members} />
                        </div>
                        <div className="room-menu-actions">
                            <Button
                                variant="danger"
                                onClick={() => setShowLeaveModal(true)}
                            >
                                Leave room
                            </Button>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            <LeaveModal
                room={room}
                showLeaveModal={showLeaveModal}
                setShowLeaveModal={setShowLeaveModal}
            />
        </div>
    );
}

import { Button } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Members from "./Members";

export default function ChatHeader({ room }) {
    const [members, setMembers] = useState([]);
    const [showMembers, setShowMembers] = useState(false);
    useEffect(() => {
        if (room) {
            axios
                .get(`/rooms/${room.id}/members`)
                .then((res) => {
                    console.log(res.data);
                    setMembers(res.data);
                })
                .catch((e) => console.log(e.response));
        }
    }, [room]);

    return (
        <div className="chat-room-header">
            <div className="chat-room-name">{room?.name ?? ""}</div>
            <div className="chat-room-header-actions">
                <Button variant="info" onClick={() => setShowMembers(true)}>
                    Members
                </Button>
            </div>

            <Offcanvas
                show={showMembers}
                onHide={() => setShowMembers(false)}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Members</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Members members={members} />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

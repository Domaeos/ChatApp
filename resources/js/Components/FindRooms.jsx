import { MyRoomsContext } from "@/Pages/Rooms/Index";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import { Check, PersonPlusFill } from "react-bootstrap-icons";
import toast from "react-hot-toast";

export default function FindRooms() {
    const myRooms = useContext(MyRoomsContext);
    const [joining, setJoining] = useState(false);
    const [joinID, setJoinID] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [roomList, setRoomList] = useState([]);

    function handleJoin(id) {
        setJoining(true);
        setJoinID(id);
        axios
            .post("/rooms/join", { roomID: id })
            .then((res) => {
                setJoinID(null);
                setJoining(false);
            })
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        axios
            .get(`rooms?search=${searchTerm}`)
            .then((res) => {
                setRoomList(res.data);
            })
            .catch((e) => console.error("Error fetching rooms"));
    }, [searchTerm]);

    return (
        <>
            <div className="find-room-wrapper">
                <input
                    type="text"
                    value={searchTerm}
                    disabled={joining}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                    className="input-find-room"
                ></input>

                <ListGroup className="find-room-list" flush="true">
                    {roomList.map((room, index) => {
                        return (
                            <ListGroup.Item
                                className={`d-flex justify-content-between align-items-start`}
                                key={index}
                            >
                                <div
                                    className={`ms-2 me-auto ${
                                        joining &&
                                        joinID !== room.id &&
                                        `text-slate-200`
                                    }`}
                                >
                                    {room.name}
                                </div>
                                {joining ? (
                                    joinID === room.id && <Spinner size="sm" />
                                ) : !myRooms.find((x) => x.id === room.id) ? (
                                    <Button
                                        className="invisible-button"
                                        disabled={joining}
                                        onClick={() => {
                                            handleJoin(room.id);
                                        }}
                                    >
                                        <PersonPlusFill color="text-success" />
                                    </Button>
                                ) : (
                                    <Check />
                                )}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </div>
        </>
    );
}

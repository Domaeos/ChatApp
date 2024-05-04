import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";

export default function FindRooms() {
    const [searchTerm, setSearchTerm] = useState("");
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        axios
            .get(`rooms?search=${searchTerm}`)
            .then((res) => {
                console.log(res.data);
                setRoomList(res.data);
            })
            .catch((e) => console.log(e.response));
    }, [searchTerm]);

    return (
        <>
            <div className="find-room-wrapper">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        console.log(searchTerm);
                    }}
                    className="input-find-room"
                ></input>
                <ListGroup className="find-room-list" flush="true">
                    {roomList.map((room, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                {room.name}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </div>
        </>
    );
}

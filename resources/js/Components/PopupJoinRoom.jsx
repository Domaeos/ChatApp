import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function PopupJoinRoom(props) {
    const [data, setData] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setSubmitted(false);
        setData(() => {
            return { room_id: props.room.id };
        });
    }, [props]);

    function handleJoin(e) {
        e.preventDefault();
        setSubmitted(true);
        router.post(route("rooms.join", data));
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.room.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.room.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={submitted} onClick={handleJoin}>
                    Join room
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

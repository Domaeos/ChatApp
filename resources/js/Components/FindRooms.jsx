import { Button, Modal } from "react-bootstrap";

export default function FindRooms() {
    function handleFind() {
        console.log("finding");
    }
    return (
        <>
            <Button onClick={handleFind}>Find a room</Button>
        </>
    );
}

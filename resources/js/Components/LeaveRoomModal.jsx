import { RefreshContext } from "@/Pages/Rooms/Index";
import axios from "axios";
import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";

export default function LeaveModal({
    setShowLeaveModal,
    showLeaveModal,
    room,
}) {
    const handleClose = () => setShowLeaveModal(false);
    const { setRoomsRefresh } = useContext(RefreshContext);

    function handleLeave() {
        setShowLeaveModal(false);
        if (room.id) {
            const leavePromise = axios
                .post("rooms/leave", {
                    roomID: room.id,
                })
                .then((res) => {
                    console.log(res);
                    setRoomsRefresh((flag) => !flag);
                })
                .catch((e) => {
                    console.log(e);
                });
            toast.promise(leavePromise, {
                loading: "Leaving...",
                success: "You have left the room",
                error: "Oops, something went wrong!",
            });
        }
    }

    return (
        <>
            <Modal show={showLeaveModal} onHide={handleClose}>
                <Modal.Body>
                    Are you sure you want to leave '{room?.name}'?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLeave}>
                        Leave
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

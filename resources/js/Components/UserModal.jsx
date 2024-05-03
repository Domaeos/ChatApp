import { useState } from "react";
import { Modal } from "react-bootstrap";
import FindRooms from "./FindRooms";

export default function UserModal({ modal, setModal }) {
    const hideModal = () => {
        setModal(() => {
            return { show: false, action: "" };
        });
    };
    return (
        <Modal show={modal.show} fullscreen="sm-down" onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{modal.action}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modal.action === "Find a room" && <FindRooms />}
            </Modal.Body>
        </Modal>
    );
}

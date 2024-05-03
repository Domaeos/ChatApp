import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function UserModal({ modal, setModal }) {
    const hideModal = () => {
        console.log(modal);
        setModal((modal) => {
            return { show: false, action: "" };
        });
    };
    return (
        <Modal show={modal.show} fullscreen="sm-down" onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{modal.action}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Modal body content</Modal.Body>
        </Modal>
    );
}

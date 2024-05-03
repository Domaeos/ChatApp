import { useEffect } from "react";
import { useRef } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

export default function ChatInput({
    message,
    setMessage,
    handleSubmit,
    submitting,
    currentRoom,
}) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (!submitting) {
            inputRef.current.focus();
        }
    }, [submitting]);

    function handleKeyPress(e) {
        if (e.code === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!submitting) handleSubmit();
        }
    }
    return (
        <>
            <InputGroup className="chat-input">
                <Form.Control
                    disabled={submitting}
                    ref={inputRef}
                    value={message}
                    onKeyDownCapture={(e) => handleKeyPress(e)}
                    className="chat-input"
                    onChange={(e) => setMessage(e.target.value)}
                    as="textarea"
                    aria-label="With textarea"
                />
                <Button
                    variant="outline-secondary"
                    disabled={!message.length || submitting || !currentRoom}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </InputGroup>
        </>
    );
}

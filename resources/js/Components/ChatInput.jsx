import { useEffect } from "react";
import { useRef } from "react";

export default function ChatInput({
    message,
    setMessage,
    handleSubmit,
    submitting,
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
            <textarea
                disabled={submitting}
                ref={inputRef}
                value={message}
                onKeyDownCapture={(e) => handleKeyPress(e)}
                className="chat-input"
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
        </>
    );
}

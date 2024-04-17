export default function ChatInput({ message, setMessage }) {
    return (
        <>
            <textarea
                value={message}
                className="chat-input"
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
        </>
    );
}

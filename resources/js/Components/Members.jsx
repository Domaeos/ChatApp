import { usePage } from "@inertiajs/react";
import { Dropdown, Button } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";

export default function Members({ members }) {
    const {
        auth: { user },
    } = usePage().props;

    function handleSelect(key) {
        const [action, id] = key.split("-");
        if (action === "add") {
            console.log("adding" + id);
        }
    }
    return (
        <>
            <div className="room-members-grid">
                {members?.map((member) => {
                    return (
                        <Dropdown
                            onSelect={handleSelect}
                            key={generateUniqueId()}
                        >
                            <Dropdown.Toggle disabled={user.id === member.id}>
                                {member.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="single-member-dropdown">
                                <Dropdown.Item eventKey={`add-${member.id}`}>
                                    Add friend
                                </Dropdown.Item>
                                <Dropdown.Item eventKey={`block-${member.id}`}>
                                    Block
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    );
                })}
            </div>
        </>
    );
}

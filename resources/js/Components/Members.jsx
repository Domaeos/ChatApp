import { usePage } from "@inertiajs/react";
import { Dropdown } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";

export default function Members({ members }) {
    const {
        auth: { user },
    } = usePage().props;

    function handleActions() {}
    return (
        <>
            {members?.map((member, i) => {
                return (
                    <Dropdown key={generateUniqueId()}>
                        <Dropdown.Toggle disabled={user.id === member.id}>
                            {member.name}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="single-member-dropdown">
                            <Dropdown.Item eventKey="1">
                                Add friend
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                );
            })}
        </>
    );
}

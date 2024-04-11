import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateRoomForm from "@/Components/CreateRoomForm";

export default function AllRooms({ auth, rooms, error }) {
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                {error && <h1>Error creating room</h1>}
                <Head title="Create a room" />
                <CreateRoomForm />;
            </AuthenticatedLayout>
        </>
    );
}

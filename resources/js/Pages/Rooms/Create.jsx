import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateRoomForm from "@/Components/CreateRoomForm";

export default function AllRooms({ auth, rooms }) {
    console.log(rooms);
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Create a room" />
                <CreateRoomForm />;
            </AuthenticatedLayout>
        </>
    );
}

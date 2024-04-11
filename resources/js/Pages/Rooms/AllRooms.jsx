import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
export default function AllRooms({ auth, rooms }) {
    console.log(rooms);
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Find a room" />
                <div className="flex-1 justify-items-center justify-content-center">
                    {/* <input type="text"></input> */}
                    <ul>
                        {rooms.map((room) => {
                            return (
                                <li>
                                    {room.name}: {room.description}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

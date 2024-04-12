import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import { router } from "@inertiajs/react";
import RoomCard from "@/Components/RoomCard";

export default function MyRooms({ auth, rooms, flash }) {
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Find a room" />
                {!rooms && <h1>Loading my rooms..</h1>}
                <div className="myrooms-grid">
                    {rooms &&
                        rooms.map((room, index) => {
                            return (
                                <RoomCard
                                    key={`${index}-${room.name}`}
                                    room={room}
                                />
                            );
                        })}
                </div>
                <div>
                    <Toaster />
                </div>
            </AuthenticatedLayout>
        </>
    );
}

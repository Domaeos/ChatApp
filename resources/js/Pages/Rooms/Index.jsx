import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Guest from "@/Layouts/GuestLayout";

import CreateRoomForm from "@/Components/CreateRoomForm";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

export default function Index({ auth, rooms, request, flash }) {
    return (
        <>
            {!auth.user && (
                <Guest>
                    <h1>Login/Register to get started</h1>
                </Guest>
            )}
            {auth.user && (
                <AuthenticatedLayout user={auth.user}>
                    <Head title="Rooms" />
                    <div className="flex flex-1 justify-center content-center items-center">
                        <Link
                            className="text-slate-900 text-3xl deco no-underline hover:underline underline-offset-10 mr-5"
                            href={route("rooms.index")}
                        >
                            Find Rooms
                        </Link>
                        <div className=" h-[100px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
                        <Link
                            className="text-slate-900 text-3xl deco no-underline hover:underline underline-offset-10"
                            href={route("rooms.myrooms")}
                        >
                            My rooms
                        </Link>
                        <div className="mr-5 h-[100px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
                        <Link
                            className="text-slate-900 text-3xl deco no-underline hover:underline underline-offset-10"
                            href={route("rooms.create")}
                        >
                            Create Room
                        </Link>
                    </div>
                </AuthenticatedLayout>
            )}
        </>
    );
}

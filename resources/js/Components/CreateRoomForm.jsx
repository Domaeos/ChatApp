import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import InputError from "./InputError";
import Checkbox from "./Checkbox";
import PrimaryButton from "./PrimaryButton";

export default function CreateRoomForm() {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        description: "",
        private: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("rooms.store"));
    }

    return (
        <>
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={data.name}
                        placeholder="Name of your room"
                        className="mb-5 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("name", e.target.value)}
                    ></input>
                    <InputError message={errors.name} className="mt-2" />
                    <input
                        type="text"
                        value={data.description}
                        placeholder="Enter a short description of your room"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("description", e.target.value)}
                    ></input>
                    <InputError message={errors.description} className="mt-2" />
                    <Checkbox
                        id="private"
                        name="private"
                        // true-value="1"
                        // false-value="0"
                        onChange={(e) => {
                            setData("private", e.target.checked);
                        }}
                    />
                    <label htmlFor="private_check">Make room private?</label>
                    <br />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Create Room
                    </PrimaryButton>
                </form>
            </div>
        </>
    );
}

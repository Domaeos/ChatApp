<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Message;
use App\Models\Moderator;
use App\Models\Room;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Rooms/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Rooms/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        // Add check later for app settings whether anyone can make a room or not
        $validated = $request->validate([
            'name' => 'string|min:10|max:50|required',
            'description' => 'string|min:10|max:250|required',
            'private' => 'boolean'
        ]);
        
        if ($validated) {
        
            $userInfo = ['user_id' => $request->user()->id];
            $newRoom = $request->user()->rooms()->create(array_merge($validated, $userInfo));

            $newModerates = new Moderator([
            '   user_id' => $request->user()->id,
            '   room_id' => $newRoom->id,
            ]);
            $newModerates->save();

            $newMember = new Member([
                'user_id' => $request->user()->id,
                'room_id' => $newRoom->id,
            ]);

            $newMember->save();
        }
        return redirect(route('rooms.index'));
    }

    // Return all rooms
    public function all(Request $request) {
        return Inertia::render('Rooms/AllRooms', [
            'rooms' => Room::select('name', 'description')->where('private', false)->get(),
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function myrooms(Request $request)
    {
        return Inertia::render('Rooms/Index', [
            'rooms' => $request->user()->rooms()->get(),
        ]);
    }

    public function show(Room $room) {
        // add events for new messages in a room
        // Chunk or cursor for a lot of potential messages?
        return Inertia::render('Rooms/Chat', [
            'messages' => Message::latest()->limit(200)->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}

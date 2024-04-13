<?php

namespace App\Http\Controllers;

use App\Events\PusherEvent;
use App\Models\Member;
use App\Models\Message;
use App\Models\Moderator;
use App\Models\Room;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;
use Pusher\Pusher;

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
                'user_id' => $request->user()->id,
                'room_id' => $newRoom->id,
            ]);
            $newModerates->save();

            $newMember = new Member([
                'user_id' => $request->user()->id,
                'room_id' => $newRoom->id,
            ]);

            $newMember->save();
            event(new PusherEvent('Room has been created: '.$newRoom->name));
        }
        return redirect(route('rooms.index'));
    }

    // Return all rooms that arent private
    public function all(Request $request) {
        return Inertia::render('Rooms/AllRooms', [
            'rooms' => Inertia::lazy(fn() => Room::select('name', 'description', 'id')->where('private', false)->get()),        ]);
    }
    /**
     * Display the specified resource.
     */
    public function myrooms(Request $request)
    {
        return Inertia::render('Rooms/MyRooms', [
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
    
    public function join(Request $request) {
        $joinId = $request->input('room_id');
        $room = Room::select('name')->where('id', $joinId)->first();

        // Ensure room isnt private
        // ---- 

        // Check user hasnt already joined
        if($request->user()->rooms()->find($joinId)->exists()) {
            return back()->with('message', 'Already a member of '.$room->name)->with('status', 'error');
        }

        $newMembership = new Member([
            'user_id' => $request->user()->id,
            'room_id' => $joinId,
        ]);
        $newMembership->save();

        return back()->with('message', "Successfully joined: ".$room->name)->with('status', 'success');
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

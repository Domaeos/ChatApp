<?php

namespace App\Http\Controllers;

use App\Events\PusherEvent;
use App\Models\Member;
use App\Models\Message;
use App\Models\Moderator;
use App\Models\Room;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

use function Laravel\Prompts\search;

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
        }
    }

    // Return all rooms that arent private
    public function all(Request $request) {
        error_log($request->search);
        if (empty($request->search)) {
            return Room::limit(20)->get();
        } else {
            return Room::where("name", "like", "%{$request->search}%")->limit(20)->get();

        }
        // $rooms =  Room::select('name', 'description', 'id')->where('private', false)->get();
    }

    // Return rooms user belongs to
    public function myrooms(Request $request)
    {
        // return DB::table('members')->where('members.user_id', $request->user()->id)->rightJoin('rooms', 'members.room_id', '=', 'rooms.id')->get();
        error_log($request->user()->rooms);
        return $request->user()->rooms;
    }

    // Retrieve last 200 messages from room. Ability to paginate to be
    // and offset to be added later date
    public function show(Room $room) {
        // add events for new messages in a room
        // Chunk or cursor for a lot of potential messages?
        return Inertia::render('Rooms/Chat', [
            'messages' => Message::latest()->limit(200)->get(),
        ]);
    }
    
    public function join(Request $request) {
    try {
        $joinId = $request->input('roomID');
        $room = Room::select('name')->where('id', $joinId)->first();

        // Ensure room isnt private
        // ---- 

        // Check user hasnt already joined
        if($request->user()->rooms->find($joinId)) {
            return response("Already a member of this room", 400);
        }

        $newMembership = new Member([
            'user_id' => $request->user()->id,
            'room_id' => $joinId,
        ]);
        $newMembership->save();

        return response("Successfully joined: ".$room->name, 200);
    } catch (Exception $e) {
        error_log($e);
        error_log("Erroring on join");
        return response("Error joining room", 500);
    }
    }
    
    public function members(Request $request) {
        $room = Room::find($request->roomID);
        return $room ? response($room->users, 200) : response("Error", 400);
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

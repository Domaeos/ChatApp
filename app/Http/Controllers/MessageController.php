<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use App\Events\PusherEvent;

class MessageController extends Controller
{
    public function sendMessage(Request $request) {
        $request->validate([
            // 'roomID' => 'numeric|required|min:0',
            'message' => 'string|required|max:255|min:1'
        ]);

        $roomCheck = $request->user()->rooms()->find($request->roomID);
        if ($roomCheck) {
            $newMessage = new Message([
                'message' => $request->message,
                'room_id' => $request->roomID,
                'user_id' => $request->user()->id,
            ]);
            $newMessage->save();
            event(new PusherEvent($newMessage));
            return Response::json('Success', 201);
        } else {
             return abort(400, 'Invalid request');
        }
    }

    public function getMessages(Request $request) {
        $roomID = (int) Route::input('roomID');
        return Message::where('room_id', $roomID)->with('user:id,name')->get();
    }

    public function getSingularMessage(Request $request) {
        // $roomID = (int) Route::input('roomID');
        $messageID = (int) Route::input('messageID');
        return Message::find($messageID);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}

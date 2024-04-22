<?php

namespace App\Listeners;

use App\Events\PusherEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Pusher\Pusher;

class SendPusherEvent
{
    /**
     * Create the event listener.
     */
    private $pusher;
    public function __construct()
    {
        $this->pusher = new Pusher("253a1d5cf5a2b33393e7", "cff7b1d3d3242ce2eb5b", "1787417", array('cluster' => 'eu'));
    }
    
    /**
     * Handle the event.
     */
    public function handle(PusherEvent $event): void
    {
        $this->pusher->trigger($event->broadcastOn(), $event->broadcastAs(), array('message' => $event->message));
    }
}

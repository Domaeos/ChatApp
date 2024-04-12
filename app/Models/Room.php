<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'private', 'user_id'
    ];
    
    protected $appends = [
        'population',
    ];

    public function users() {
        return $this->hasManyThrough(User::class, Member::class);
    }

    public function moderators() {
        return $this->hasManyThrough(User::class, Moderator::class);
    }

    public function owner() {
        return $this->hasOne(User::class);
    }

    public function getPopulationAttribute() {
        return Member::where('room_id', $this->id)->count();
    }

    public function hasMember(User $user) {
        return (Member::where('room_id', $this->id)->where('user_id', $user->id)->count() !== 0);
    }
}
    
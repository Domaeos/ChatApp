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
        'population', 'ownerName'
    ];

    public function users() {
        return $this->belongsToMany(User::class);
    }

    public function moderators() {
        return $this->hasManyThrough(User::class, Moderator::class);
    }

    public function owner() {
        return $this->hasOne(User::class);
    }
    public function getOwnerNameAttribute() {
        return User::where('id', $this->user_id)?->pluck('name')[0];
    }
    public function getPopulationAttribute() {
        return $this->users->count();
    }

    public function messages() {
        return $this->hasMany(Message::class);
    }

    // public function hasMember(User $user) {
    //     return (Member::where('room_id', $this->id)->where('user_id', $user->id)->count() !== 0);
    // }
}
    
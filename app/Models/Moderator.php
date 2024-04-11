<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Moderator extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'user_id', 'room_id'
    ];

    public function users() {
        return $this->hasMany(User::class);
    }
    public function rooms() {
        return $this->hasMany(Room::class);
    }
}

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
    
    public function users() {
        return $this->hasManyThrough(User::class, Member::class);
    }
    public function moderators() {
        return $this->hasManyThrough(User::class, Moderator::class);
    }
    public function owner() {
        return $this->hasOne(User::class);
    }
}
    
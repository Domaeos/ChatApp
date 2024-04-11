<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'private'
    ];
    
    public function users() {
        return $this->hasMany(User::class);
    }
    public function moderators() {
        return $this->hasManyThrough(User::class, Moderator::class);
    }
}

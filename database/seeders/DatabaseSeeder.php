<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Hashing\HashServiceProvider;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userAdmin = User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'test@example.com',
            'role' => 'admin',
            'password' => Hash::make('password'),
        ]);
        $testRoom = Room::factory()->create([
            "name" => "Test room by Admin",
            "description" => "Testing purposes",
            "private" => false,
            "user_id" => 1
        ]);
        $testRoom->users()->attach($userAdmin);
        $userNormal = User::factory()->create([
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'role' => 'user',
            'password' => Hash::make('password'),
        ]);
        $userRoom = Room::factory()->create([
            "name" => "Test room by User",
            "description" => "Testing purposes",
            "private" => false,
            "user_id" => 2
        ]);
        $userRoom->users()->attach($userNormal);

    }
}

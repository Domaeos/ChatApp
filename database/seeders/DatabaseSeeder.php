<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Room;
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
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 'admin',
            'password' => Hash::make('password'),
        ]);
        // $testRoom = new Room();
        // $testRoom->name = "Test room";
        // $testRoom->description = "Testing room purposes";
        // $testRoom->private = false;
        // $testRoom->user_id = 1;
        // $testRoom->save();
    }
}

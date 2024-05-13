<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use App\Models\Message;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Group and tidy up
Route::get('rooms/myrooms', [RoomController::class, 'myrooms'])
->middleware(['auth', 'verified'])
->name('rooms.myrooms');

Route::get('rooms', [RoomController::class, 'all'])
->middleware(['auth', 'verified'])
->name('rooms.all');

Route::post('rooms/join', [RoomController::class, 'join'])
->middleware(['auth', 'verified'])
->name('rooms.join');

Route::post('rooms/leave', [RoomController::class, 'leave'])
->middleware(['auth', 'verified', 'verifyMemberOfRoom'])
->name('rooms.leave');

Route::get('/', [RoomController::class, 'index'])->name('rooms.index');

Route::get('/messages/{roomID}', [MessageController::class, 'getMessages'])
->middleware(['auth', 'verified', 'verifyMemberOfRoom'])
->name('message.all');

Route::get('rooms/{roomID}/members', [RoomController::class, 'members'])
->middleware(['auth', 'verified', 'verifyMemberOfRoom'])
->name('rooms.members');

Route::get('/messages/{roomID}/{messageID}', [MessageController::class, 'getMessages'])
->middleware(['auth', 'verified', 'verifyMemberOfRoom'])
->name('message.single');

Route::post('/messages/{roomID}', [MessageController::class, 'sendMessage'])
->middleware(['auth', 'verified', 'verifyMemberOfRoom'])
->name('message.send');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

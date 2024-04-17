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

Route::get('rooms/myrooms', [RoomController::class, 'myrooms'])
->middleware(['auth', 'verified'])
->name('rooms.myrooms');
Route::post('rooms/join', [RoomController::class, 'join'])
->middleware(['auth', 'verified'])
->name('rooms.join');
Route::get('/', [RoomController::class, 'index'])->name('rooms.index');

Route::get('/messages/{roomID}', [MessageController::class, 'getMessages'])
->middleware(['auth', 'verified', 'verifyMemberOfRoom'])
->name('message.all');

Route::post('/messages/{roomID}', [MessageController::class, 'sendMessage'])
->middleware(['auth', 'verified', 'verifyMemberOfRoom'])
->name('message.send');

// Route::resource('rooms', RoomController::class)
// ->only(['index', 'store', 'show', 'create'])
// ->middleware(['auth', 'verified']);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/events/test', function () {
    return Inertia::render('EventTest/Events');
});

require __DIR__.'/auth.php';

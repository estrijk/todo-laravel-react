<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('index');
});

Route::get('/getTodos', [App\Http\Controllers\TodoController::class, 'getTodos']);
Route::post('/add', [App\Http\Controllers\TodoController::class, 'add']);
Route::post('/delete', [App\Http\Controllers\TodoController::class, 'delete']);
Route::post('/update', [App\Http\Controllers\TodoController::class, 'update']);
Route::post('/complete', [App\Http\Controllers\TodoController::class, 'complete']);

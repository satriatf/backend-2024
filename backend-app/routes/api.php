<?php

use App\Http\Controllers\AnimalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route GET untuk menampilkan daftar hewan
Route::get('/animals', [AnimalController::class, 'index']);

// Route POST untuk menambah data hewan
Route::post('/animals', [AnimalController::class, 'store']);

// Route PUT untuk mengupdate data hewan
Route::put('/animals/{id}', [AnimalController::class, 'update']);

// Route DELETE untuk menghapus data hewan
Route::delete('/animals/{id}', [AnimalController::class, 'destroy']);

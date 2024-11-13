<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\EmployeeController;

// Get All Resource
Route::get('/employees', [EmployeeController::class, 'index']);

// Add Resource
Route::post('/employees', [EmployeeController::class, 'store']);

// Get Detail Resource
Route::get('/employees/{id}', [EmployeeController::class, 'show']);

// Edit Resource
Route::put('/employees/{id}', [EmployeeController::class, 'update']);

// Delete Resource
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);


// Search Resource by name
Route::get('/employees/search/{name}', [EmployeeController::class, 'search']);

// Get Active Resource
Route::get('/employees/status/active', [EmployeeController::class, 'active']); 

// Get Inactive Resource
Route::get('/employees/status/inactive', [EmployeeController::class, 'inactive']);

// Get Terminated Resource
Route::get('/employees/status/terminated', [EmployeeController::class, 'terminated']);




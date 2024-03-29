<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\ProductoController;
use App\Http\Controllers\PasswordResetRequestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('producto')->group(function () {
    Route::get('/',[ ProductoController::class, 'getAll']);
    Route::post('/',[ ProductoController::class, 'create']);
    Route::delete('/{id}',[ ProductoController::class, 'delete']);
    Route::get('/{id}',[ ProductoController::class, 'get']);
    Route::put('/{id}',[ ProductoController::class, 'update']);
});

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('user-profile', 'AuthController@userProfile');
    Route::post('newRegistro', 'AuthController@newRegistro');

    Route::post('buscaCorreo', 'AuthController@buscaCorreo');

    Route::post('/reset-password-request', [PasswordResetRequestController::class, 'sendPasswordResetEmail']);

    Route::post('/change-password', [PasswordResetRequestController::class, 'passwordResetProcess']);
});






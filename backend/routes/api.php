<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\User\SnippetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(["prefix" => "v0.1"], function() {
    Route::group(["middleware" => "auth:api"], function() {
        Route::group(["prefix" => "user"], function() {
            Route::post("/snippet", [SnippetController::class, 'addOrUpdateSnippets']);
            Route::get("/get-snippets", [SnippetController::class, 'getSnippets']);
        });
    });

    Route::group(["prefix" => "guest"], function() {
        Route::post("/login", [AuthController::class, "login"]);
        Route::post("/register", [AuthController::class, "register"]);
    });
});
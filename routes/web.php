<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;

Route::middleware("web")->group(function () {
    Route::prefix("auth")->group(function () {
        Route::post("/register", [AuthController::class, "register"])->name('register');
        Route::post("/login", [AuthController::class, "login"])->name('login');
        Route::post("/logout", [AuthController::class, "logout"])->name('logout');
        Route::post("/verify-token", [AuthController::class, "verifyToken"])->name('verify-token');
        Route::post("/verify-email", [AuthController::class, "verifyEmail"])->name('verify-email');
        Route::get("/session", [AuthController::class, "getSession"])->name('session');
        Route::post("/send-verification-code", [AuthController::class, "sendVerificationCode"])->name('send-verification-code');
        Route::post("/recovery-password", [AuthController::class, "recoveryPassword"])->name('recovery-password');
        Route::post("/reset-password", [AuthController::class, "resetPassword"])->name('reset-password');
    });
});

Route::get('/{path?}', function () {
    return Inertia::render('App');
})->where('path', '.*');

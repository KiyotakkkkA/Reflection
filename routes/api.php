<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

Route::middleware('web')->group(function () {
    Route::prefix("profile")->group(function () {
        Route::post("/avatar", [ProfileController::class, "updateAvatar"])->name('profile.update-avatar');
        Route::post("/check-username", [ProfileController::class, "checkUsername"])->name('profile.check-username');

        Route::get("/{username}", [ProfileController::class, "getProfile"])->name('profile.show');
        Route::put("/{username}", [ProfileController::class, "updateProfile"])->name('profile.update');
    });
});

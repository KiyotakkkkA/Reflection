<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

Route::prefix("profile")->group(function () {
    Route::get("/{username}", [ProfileController::class, "getProfile"])->name('profile.show');
});

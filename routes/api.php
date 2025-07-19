<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

Route::middleware('web')->group(function () {
    Route::prefix("profile")->group(function () {

        Route::post("/follow", [ProfileController::class, "follow"])->name('profile.follow');
        Route::post("/unfollow", [ProfileController::class, "unfollow"])->name('profile.unfollow');

        Route::post("/{username}/avatar", [ProfileController::class, "updateAvatar"])->name('profile.update-avatar')
            ->middleware('profile.owner');
        Route::post("/{username}/check-username", [ProfileController::class, "checkUsername"])->name('profile.check-username')
            ->middleware('profile.owner');

        Route::get("/{username}/followers", [ProfileController::class, "getFollowersList"])->name('profile.followers');
        Route::get("/{username}/followings", [ProfileController::class, "getFollowingsList"])->name('profile.followings');

        Route::get("/{username}", [ProfileController::class, "getProfile"])->name('profile.show');
        Route::put("/{username}", [ProfileController::class, "updateProfile"])->name('profile.update')
            ->middleware('profile.owner');
    });
});

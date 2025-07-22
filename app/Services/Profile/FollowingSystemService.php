<?php

namespace App\Services\Profile;

use App\Models\Profile;
use App\Exceptions\UserNotFoundOrTimeIsOut;
use Illuminate\Support\Facades\Auth;

class FollowingSystemService
{

    public function getFollowingsList($username) {
        // Подписки

        $profile = Profile::where('username', $username)->first();

        if (!$profile) {
            throw new UserNotFoundOrTimeIsOut();
        }

        $followings = $profile->followings()
            ->select([
                'profiles.fullname',
                'profiles.username',
                'profiles.avatar'
            ])
            ->get();

        return $followings;
    }

    public function getFollowersList($username) {
        // Подписчики

        $profile = Profile::where('username', $username)->first();

        if (!$profile) {
            throw new UserNotFoundOrTimeIsOut();
        }

        $followers = $profile->followers()
            ->select([
                'profiles.fullname',
                'profiles.username',
                'profiles.avatar'
            ])
            ->get();

        return $followers;
    }


    public function follow($username) {
        $profile = Profile::where('username', $username)->first();

        if (!$profile) {
            throw new UserNotFoundOrTimeIsOut();
        }

        $profile->followers()->attach(auth()->user()->profile->id);

        return [
            'from_profile_username' => auth()->user()->profile->username,
            'to_profile_username' => $profile->username,
        ];
    }

    public function unfollow($username) {
        $profile = Profile::where('username', $username)->first();

        if (!$profile) {
            throw new UserNotFoundOrTimeIsOut();
        }

        $profile->followers()->detach(auth()->user()->profile->id);

        return [
            'from_profile_username' => auth()->user()->profile->username,
            'to_profile_username' => $profile->username,
        ];
    }
}


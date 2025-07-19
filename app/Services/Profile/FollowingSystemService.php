<?php

namespace App\Services\Profile;

use App\Models\Profile;
use App\Exceptions\UserNotFoundOrTimeIsOut;

class FollowingSystemService
{

    public function getFollowingsList($username)
    {
        $profile = Profile::where('username', $username)->first();

        if (!$profile) {
            throw new UserNotFoundOrTimeIsOut();
        }

        return $profile->followings()->select([
            'profiles.fullname',
            'profiles.username',
            'profiles.avatar'
        ])->get();
    }

    public function getFollowersList($username)
    {
        $profile = Profile::where('username', $username)->first();

        if (!$profile) {
            throw new UserNotFoundOrTimeIsOut();
        }

        return $profile->followers()->select([
            'profiles.fullname',
            'profiles.username',
            'profiles.avatar'
        ])->get();
    }


    public function follow($username)
    {
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

    public function unfollow($username)
    {
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


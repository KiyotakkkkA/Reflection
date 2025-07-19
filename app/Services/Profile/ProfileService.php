<?php

namespace App\Services\Profile;

use Illuminate\Support\Str;
use App\Models\Profile;
use App\Exceptions\InvalidCredentialsException;
use App\Exceptions\UsernameWasAlreadyChangedWithThisProfileException;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AvatarsRepository;

class ProfileService
{

    private $avatarsRepository;

    public function __construct(AvatarsRepository $avatarsRepository) {
        $this->avatarsRepository = $avatarsRepository;
    }

    public function create($user) {
        $profile = Profile::create([
            'user_id' => $user->id,
            'username' => 'id' . Str::random(16),
            'avatar' => '/images/avatar.webp',
        ]);

        return $profile;
    }

    public function getProfile($username) {
        $profile = Profile::where('username', $username)->first();

        if (Auth::check()) {
            $isCurrentUserFollowed = $profile == null ? false : $profile->checkUserIsFollowed(Auth::user()->id);
        } else {
            $isCurrentUserFollowed = false;
        }

        return [
            ...($profile->toArray() ?? []),
            'is_current_user_followed' => $isCurrentUserFollowed,
        ];
    }

    public function checkUsername($username) {
        $profile = Profile::where('username', $username)->first();
        return $profile == null;
    }

    public function updateProfile($data) {
        $user = Auth::user();
        $profile = $user->profile;

        if ($data['old_username'] != $profile->username) {
            throw new InvalidCredentialsException();
        }

        if ($user->custom_login_set && $data['new_username'] != null) {
            throw new UsernameWasAlreadyChangedWithThisProfileException();
        }

        $oldUsername = $profile->username;

        $profile->update([
            'username' => $user->custom_login_set ? $oldUsername : $data['new_username'],
            'fullname' => $data['fullname'] ?? $profile->fullname,
            'phone' => $data['phone'],
            'about' => $data['about'],
            'telegram_link' => $data['telegram_link'],
            'github_link' => $data['github_link'],
            'vk_link' => $data['vk_link'],
            'discord_link' => $data['discord_link'],
        ]);

        if ($data['new_username'] != $oldUsername && !$user->custom_login_set) {
            $user->custom_login_set = true;
            $user->save();
        }

        return [
            'profile' => $profile,
            'user' => $user,
        ];
    }

    public function updateAvatar($data) {

        if ($data['username'] != Auth::user()->profile->username) {
            throw new InvalidCredentialsException();
        }

        $avatar = $this->avatarsRepository->uploadAvatar($data);

        Auth::user()->profile->update([
            'avatar' => $avatar,
        ]);

        return [
            'username' => Auth::user()->profile->username,
            'avatar' => $avatar,
        ];
    }
}

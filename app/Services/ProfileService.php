<?php

namespace App\Services;

use Illuminate\Support\Str;
use App\Models\Profile;

class ProfileService
{
    public function create($user) {
        $profile = Profile::create([
            'user_id' => $user->id,
            'username' => 'id' . Str::random(16),
            'first_name' => 'Не указано',
            'last_name' => 'Не указано',
            'patronymic' => 'Не указано',
            'avatar' => '/images/avatar.webp',
        ]);

        return $profile;
    }

    public function getProfile($username) {
        $profile = Profile::where('username', $username)->first();
        return $profile;
    }
}

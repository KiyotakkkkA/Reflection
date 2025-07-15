<?php

namespace App\Repositories;

use Illuminate\Support\Str;

class AvatarsRepository
{
    public function uploadAvatar($data)
    {
        $avatar = $data['image'];

        $filename = Str::random(20) . '.' . $avatar->getClientOriginalExtension();

        $avatar->move(public_path('storage/avatars'), $filename);

        return '/storage/avatars/' . $filename;
    }
}

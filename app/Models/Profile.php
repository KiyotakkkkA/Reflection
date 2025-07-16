<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'username',
        'fullname',
        'phone',
        'avatar',
        'telegram_link',
        'github_link',
        'vk_link',
        'discord_link',
        'about',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}

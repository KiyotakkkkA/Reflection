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

    public $appends = [
        'followers_count',
        'followings_count',
    ];

    public function checkUserIsFollowed($userId) {
        return $this->followers()->where('user_id', $userId)->exists();
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function followers() {
        return $this->belongsToMany(Profile::class, 'follow_profiles', 'to_profile_id', 'from_profile_id');
    }

    public function followings() {
        return $this->belongsToMany(Profile::class, 'follow_profiles', 'from_profile_id', 'to_profile_id');
    }

    public function getFollowersCountAttribute() {
        return $this->attributes['followers_count'] ?? $this->followers()->count();
    }

    public function getFollowingsCountAttribute() {
        return $this->attributes['followings_count'] ?? $this->followings()->count();
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FollowProfile extends Model
{
    protected $table = 'follow_profiles';

    protected $fillable = [
        'user_profile_id',
        'follower_profile_id',
    ];

    public function user()
    {
        return $this->belongsTo(Profile::class, 'user_profile_id', 'id');
    }

    public function follower()
    {
        return $this->belongsTo(Profile::class, 'follower_profile_id', 'id');
    }
}

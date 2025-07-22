<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FollowProfile extends Model
{
    protected $table = 'follow_profiles';

    protected $fillable = [
        'from_profile_id',
        'to_profile_id',
    ];
}

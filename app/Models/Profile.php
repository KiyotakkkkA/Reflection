<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'username',
        'first_name',
        'last_name',
        'patronymic',
        'phone',
        'avatar',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}

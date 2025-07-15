<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use App\Models\Profile;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'custom_login_set',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'temp_token',
        'temp_token_expires_at',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'custom_login_set' => 'boolean',
        ];
    }

    public function isVerified() {
        return $this->email_verified_at !== null;
    }

    public function generateTempToken() {
        $this->temp_token = Str::random(60);
        $this->temp_token_expires_at = now()->addMinutes(15);
        $this->save();

        return $this->temp_token;
    }

    public function getUserData() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'custom_login_set' => $this->custom_login_set,
        ];
    }

    public static function findByTempToken($token, $deleteAfterTokenExpires = true) {

        if (!$token) {
            return null;
        }

        $data = self::where('temp_token', $token)
            ->where('temp_token_expires_at', '>', now())
            ->first();

        if (!$data && $deleteAfterTokenExpires) {
            self::where('temp_token', $token)->delete();
            return null;
        }

        return $data;
    }

    public function profile() {
        return $this->hasOne(Profile::class);
    }
}

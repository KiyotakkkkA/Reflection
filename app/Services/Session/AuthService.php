<?php

namespace App\Services\Session;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Exceptions\UserAlreadyExistsException;
use App\Exceptions\InvalidCredentialsException;
use Illuminate\Support\Str;

class AuthService
{
    public function register($data)
    {
        if (User::where('email', $data['email'])->exists()) {
            throw new UserAlreadyExistsException();
        }
        $user = User::create([
            'name' => $data['email'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $user->generateTempToken();

        return [
            'token' => $user->temp_token,
            'success' => true,
        ];
    }

    public function login($data)
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw new InvalidCredentialsException();
        }

        Auth::login($user, $data['remember']);

        return [
            'user' => [
                ...$user->getUserData(),
                "profile" => $user->profile->username,
            ],
            'success' => true,
        ];
    }

    public function logout()
    {
        Auth::logout();

        return [
            "success" => true,
        ];
    }
}

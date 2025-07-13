<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Services\MailService;
use App\Services\ProfileService;
use App\Exceptions\UserAlreadyVerifiedException;
use App\Exceptions\InvalidCredentialsException;
use App\Exceptions\UserNotFoundOrTimeIsOut;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Cache;

class EmailVerificationService
{
    public function __construct(MailService $mailService, ProfileService $profileService)
    {
        $this->mailService = $mailService;
        $this->profileService = $profileService;
    }

    public function verifyToken($data)
    {
        $user = User::findByTempToken($data['token'], true);

        if (!$user) {
            return [
                "verified" => false,
            ];
        }

        return [
            "verified" => true,
        ];
    }

    public function verifyEmail($data)
    {
        $user = User::findByTempToken($data['token'], true);

        if (!$user) {
            throw new UserNotFoundOrTimeIsOut();
        }

        if ($user->isVerified()) {
            throw new UserAlreadyVerifiedException();
        }

        if (Cache::get($user->email) !== (int) $data['code']) {
            throw new InvalidCredentialsException();
        }

        $user->email_verified_at = now();
        $user->temp_token = null;
        $user->temp_token_expires_at = null;

        $user->save();

        $this->profileService->create($user);
        $this->mailService->sendRegisteredMail($user->email);

        return;
    }

    public function sendVerificationCode($data)
    {
        $user = User::findByTempToken($data['token'], true);

        if (!$user) {
            throw new UserNotFoundOrTimeIsOut();
        }

        if ($user->isVerified()) {
            throw new UserAlreadyVerifiedException();
        }

        $code = rand(100000, 999999);
        Cache::put($user->email, $code, now()->addMinutes(5));

        $this->mailService->sendVerificationCode($user->email, $code);

        return;
    }
}

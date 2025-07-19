<?php

namespace App\Services\Session;

use App\Models\User;
use App\Services\MailService;
use App\Exceptions\UserNotVerifiedException;
use App\Exceptions\UserNotFoundOrTimeIsOut;

class RecoveryPasswordService
{

    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }

    public function sendRecoveryPasswordLink($email)
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            throw new UserNotFoundOrTimeIsOut();
        }

        if (!$user->isVerified()) {
            throw new UserNotVerifiedException();
        }

        $user->generateTempToken();

        $link = request()->root() . "/auth/reset-password?token=" . $user->temp_token;

        $this->mailService->sendRecoveryPasswordLink($user->email, $link);

        return [
            "message" => "На вашу почту отправлено письмо с инструкциями по восстановлению пароля",
        ];
    }

    public function resetPassword($data)
    {
        $user = User::findByTempToken($data['token'], false);

        if (!$user) {
            throw new UserNotFoundOrTimeIsOut();
        }

        if (!$user->isVerified()) {
            throw new UserNotVerifiedException();
        }

        $user->password = Hash::make($data['new_password']);
        $user->temp_token = null;
        $user->temp_token_expires_at = null;

        $user->save();

        $this->mailService->sendPasswordChangedMail($user->email);

        return [
            "message" => "Пароль успешно изменен",
        ];
    }
}

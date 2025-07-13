<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use App\Notifications\PasswordRecoveryNotification;
use App\Notifications\PasswordChangedNotification;
use App\Notifications\RegisteredNotification;

class MailService
{
    public function sendVerificationCode($mail, $code)
    {
        $user = User::where('email', $mail)->first();

        $user->notify(new EmailVerificationNotification(
            $code,
            $mail
        ));
    }

    public function sendRecoveryPasswordLink($mail, $link)
    {
        $user = User::where('email', $mail)->first();

        $user->notify(new PasswordRecoveryNotification(
            $link,
            $mail
        ));
    }

    public function sendPasswordChangedMail($mail)
    {
        $user = User::where('email', $mail)->first();

        $user->notify(new PasswordChangedNotification(
            $mail
        ));
    }

    public function sendRegisteredMail($mail)
    {
        $user = User::where('email', $mail)->first();

        $user->notify(new RegisteredNotification(
            $mail
        ));
    }
}

<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordRecoveryMail extends Mailable
{
    use Queueable, SerializesModels;

    public $link;
    public $email;

    public function __construct($link, $email)
    {
        $this->link = $link;
        $this->email = $email;
    }

    public function build()
    {
        return $this->subject('Сброс пароля')
                   ->view('mail.email-pass-recovery');
    }
}

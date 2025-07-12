<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EmailVerificationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $code;
    private $email;

    public function __construct(string $code, string $email)
    {
        $this->code = $code;
        $this->email = $email;
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Код подтверждения')
            ->view(
                'mail.email-verify',
                ['code' => $this->code, 'email' => $this->email]
            );
    }
}

<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RegisteredNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $email;

    public function __construct(string $email)
    {
        $this->email = $email;
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Регистрация')
            ->view(
                'mail.email-registered',
                ['email' => $this->email]
            );
    }
}

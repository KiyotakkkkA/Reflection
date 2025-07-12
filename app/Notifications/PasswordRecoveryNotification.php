<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordRecoveryNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $link;
    private $email;

    public function __construct(string $link, string $email)
    {
        $this->link = $link;
        $this->email = $email;
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Сброс пароля')
            ->view(
                'mail.email-pass-recovery',
                ['link' => $this->link, 'email' => $this->email]
            );
    }
}

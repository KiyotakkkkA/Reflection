<?php

namespace App\Exceptions;

use Exception;

class UserAlreadyVerifiedException extends Exception
{
    public function __construct(string $message = "Пользователь уже подтвержден")
    {
        parent::__construct($message);
    }
}

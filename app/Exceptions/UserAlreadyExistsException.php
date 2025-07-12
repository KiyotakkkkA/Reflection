<?php

namespace App\Exceptions;

use Exception;

class UserAlreadyExistsException extends Exception
{
    public function __construct(string $message = "Пользователь уже существует")
    {
        parent::__construct($message);
    }
}

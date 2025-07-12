<?php

namespace App\Exceptions;

use Exception;

class InvalidCredentialsException extends Exception
{
    public function __construct(string $message = "Неверные или некорректные входные данные")
    {
        parent::__construct($message);
    }
}

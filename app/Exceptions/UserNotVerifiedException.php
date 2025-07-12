<?php

namespace App\Exceptions;

use Exception;

class UserNotVerifiedException extends Exception
{
    public function __construct(string $message = "Пользователь не подтвержден")
    {
        parent::__construct($message);
    }
}

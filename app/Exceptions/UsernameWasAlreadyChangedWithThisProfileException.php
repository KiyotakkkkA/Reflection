<?php

namespace App\Exceptions;

use Exception;

class UsernameWasAlreadyChangedWithThisProfileException extends Exception
{
    public function __construct(string $message = "В этом профиле уже был изменен тег")
    {
        parent::__construct($message);
    }
}

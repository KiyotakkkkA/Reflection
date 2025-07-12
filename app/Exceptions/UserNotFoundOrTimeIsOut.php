<?php

namespace App\Exceptions;

use Exception;

class UserNotFoundOrTimeIsOut extends Exception
{
    public function __construct(string $message = "Пользователь не найден, или сессия истекла")
    {
        parent::__construct($message);
    }
}

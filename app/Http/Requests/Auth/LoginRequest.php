<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\AuthRequest;

class LoginRequest extends AuthRequest
{
    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'remember' => 'required|boolean',
        ]);
    }

    public function messages(): array
    {
        return array_merge(parent::messages(), [
            'remember.required' => 'Поле "Запомнить меня" обязательно для заполнения',
            'remember.boolean' => 'Некорректное значение',
        ]);
    }
}

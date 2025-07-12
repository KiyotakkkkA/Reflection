<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\AuthRequest;

class RegistrationRequest extends AuthRequest
{
    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'password_confirmation' => 'required|same:password',
        ]);
    }

    public function messages(): array
    {
        return array_merge(parent::messages(), [
            'password_confirmation.required' => 'Пароль не был подтвержден',
            'password_confirmation.same' => 'Пароли не совпадают',
        ]);
    }
}

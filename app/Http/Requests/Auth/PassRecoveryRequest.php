<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class PassRecoveryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "email" => "required|email|exists:users,email",
        ];
    }

    public function messages(): array
    {
        return [
            "email.required" => "Поле 'Электронная почта' обязательно",
            "email.email" => "Некорректная почта",
            "email.exists" => "Пользователь с такой почтой не зарегистрирован",
        ];
    }
}

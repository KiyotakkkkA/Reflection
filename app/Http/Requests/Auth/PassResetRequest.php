<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class PassResetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "token" => "required|string",
            "new_password" => "required|string|min:8|same:new_password_confirmation",
            "new_password_confirmation" => "required|string|min:8",
        ];
    }

    public function messages(): array
    {
        return [
            "token.required" => "Некорректный токен",
            "new_password.required" => "Поле 'Новый пароль' обязательно",
            "new_password.min" => "Новый пароль должен содержать не менее 8 символов",
            "new_password_confirmation.required" => "Поле 'Подтверждение пароля' обязательно",
            "new_password_confirmation.same" => "Пароли не совпадают",
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required|min:8|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Поле "Электронная почта" обязательно для заполнения',
            'email.email' => 'Некорректная почта',
            'password.required' => 'Поле "Пароль" обязательно для заполнения',
            'password.min' => 'Поле "Пароль" должно содержать не менее 8 символов',
            'password.max' => 'Поле "Пароль" должно содержать не более 255 символов',
        ];
    }
}

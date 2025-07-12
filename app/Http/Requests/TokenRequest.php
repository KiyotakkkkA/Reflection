<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TokenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "token" => "string|nullable"
        ];
    }

    public function messages(): array
    {
        return [
            "token.string" => "Поле 'Токен' должно быть строкой"
        ];
    }
}

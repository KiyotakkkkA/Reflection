<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ImageUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'image' => 'required|image|max:2048',
            'username' => 'required|string|exists:profiles,username',
        ];
    }

    public function messages(): array
    {
        return [
            'image.required' => 'Пустое изображение',
            'image.image' => 'Файл должен быть изображением формата jpeg, png, jpg или webp',
            'image.max' => 'Файл не должен превышать 2048 КБ',
            'username.required' => 'Неизвестный пользователь',
            'username.string' => 'Username должен быть строкой',
            'username.exists' => 'Пользователь с таким тегом не существует',
        ];
    }
}

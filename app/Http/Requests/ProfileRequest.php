<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'old_username' => 'string|max:20|exists:profiles,username',
            'new_username' => 'string|max:20|unique:profiles,username|regex:/^[a-zA-Z0-9_]+$/u|nullable',
            'fullname' => 'string|max:50',
            'phone' => 'string|max:25|nullable',
            'about' => 'string|max:255|nullable',
            'telegram_link' => 'string|max:255|nullable',
            'github_link' => 'string|max:255|nullable',
            'vk_link' => 'string|max:255|nullable',
            'discord_link' => 'string|max:255|nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'old_username.string' => 'Поле "Тег" должно быть строкой',
            'old_username.max' => 'Поле "Тег" должно содержать не более 20 символов',
            'old_username.exists' => 'Такой тег не существует',
            'new_username.string' => 'Поле "Тег" должно быть строкой',
            'new_username.max' => 'Поле "Тег" должно содержать не более 20 символов',
            'new_username.unique' => 'Такой тег уже занят',
            'new_username.regex' => 'Поле "Тег" должно содержать только буквы, цифры и подчеркивание',
            'fullname.string' => 'Поле "Имя" должно быть строкой',
            'fullname.max' => 'Поле "Имя" должно содержать не более 50 символов',
            'phone.string' => 'Поле "Телефон" должно быть строкой',
            'phone.max' => 'Поле "Телефон" должно содержать не более 25 символов',
            'about.string' => 'Поле "О себе" должно быть строкой',
            'about.max' => 'Поле "О себе" должно содержать не более 255 символов',
            'telegram_link.string' => 'Ссылка на профиль в "Телеграм" должна быть строкой',
            'telegram_link.max' => 'Ссылка на профиль в "Телеграм" должна содержать не более 255 символов',
            'github_link.string' => 'Ссылка на профиль в "GitHub" должна быть строкой',
            'github_link.max' => 'Ссылка на профиль в "GitHub" должна содержать не более 255 символов',
            'vk_link.string' => 'Ссылка на профиль в "ВКонтакте" должна быть строкой',
            'vk_link.max' => 'Ссылка на профиль в "ВКонтакте" должна содержать не более 255 символов',
            'discord_link.string' => 'Ссылка на профиль в "Discord" должна быть строкой',
            'discord_link.max' => 'Ссылка на профиль в "Discord" должна содержать не более 255 символов',
        ];
    }
}

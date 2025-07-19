<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ProfileRequest;
use App\Http\Requests\ImageUploadRequest;
use App\Services\Profile\ProfileService;
use App\Services\Profile\FollowingSystemService;
use App\Exceptions\InvalidCredentialsException;
use App\Exceptions\UsernameWasAlreadyChangedWithThisProfileException;

class ProfileController extends Controller
{
    public $profileService;
    public $followingSystemService;

    public function __construct(ProfileService $profileService, FollowingSystemService $followingSystemService)
    {
        $this->profileService = $profileService;
        $this->followingSystemService = $followingSystemService;
    }

    public function getProfile($username)
    {
        return response()->json($this->profileService->getProfile($username));
    }

    public function checkUsername(Request $request)
    {
        $request->validate([
            'username' => 'string|max:20|unique:profiles,username|regex:/^[a-zA-Z0-9_]+$/u',
        ], [
            'username.string' => 'Поле "Тег" должно быть строкой',
            'username.max' => 'Поле "Тег" должно содержать не более 20 символов',
            'username.unique' => 'Такой тег уже занят',
            'username.regex' => 'Поле "Тег" должно содержать только буквы, цифры и подчеркивание',
        ]);

        return response()->json($this->profileService->checkUsername($request->username));
    }

    public function updateProfile(ProfileRequest $request)
    {

        try {
            return response()->json($this->profileService->updateProfile($request->only(
                [
                    'old_username',
                    'new_username',
                    'fullname',
                    'phone',
                    'about',
                    'telegram_link',
                    'github_link',
                    'vk_link',
                    'discord_link',
                ]
            )));
        } catch (InvalidCredentialsException $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
        } catch (UsernameWasAlreadyChangedWithThisProfileException $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
        }
    }

    public function updateAvatar(ImageUploadRequest $request)
    {

        $file = $request->file('image');

        try {
            return response()->json($this->profileService->updateAvatar([
                'image' => $file,
                'username' => $request->username,
            ]));
        } catch (InvalidCredentialsException $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
        }
    }

    public function follow(Request $request)
    {

        $request->validate([
            'username' => 'string|max:20|exists:profiles,username|regex:/^[a-zA-Z0-9_]+$/u',
        ], [
            'username.string' => 'Поле "Тег" должно быть строкой',
            'username.max' => 'Поле "Тег" должно содержать не более 20 символов',
            'username.exists' => 'Пользователь с таким тегом не найден',
            'username.regex' => 'Поле "Тег" должно содержать только буквы, цифры и подчеркивание',
        ]);

        try {
            return response()->json($this->followingSystemService->follow($request->username));
        } catch (UserNotFoundOrTimeIsOut $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
        }
    }

    public function unfollow(Request $request)
    {

        $request->validate([
            'username' => 'string|max:20|exists:profiles,username|regex:/^[a-zA-Z0-9_]+$/u',
        ], [
            'username.string' => 'Поле "Тег" должно быть строкой',
            'username.max' => 'Поле "Тег" должно содержать не более 20 символов',
            'username.exists' => 'Пользователь с таким тегом не найден',
            'username.regex' => 'Поле "Тег" должно содержать только буквы, цифры и подчеркивание',
        ]);

        try {
            return response()->json($this->followingSystemService->unfollow($request->username));
        } catch (UserNotFoundOrTimeIsOut $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
        }
    }

    public function getFollowingsList(Request $request)
    {

        $request->validate([
            'username' => 'string|max:20|exists:profiles,username|regex:/^[a-zA-Z0-9_]+$/u',
        ], [
            'username.string' => 'Поле "Тег" должно быть строкой',
            'username.max' => 'Поле "Тег" должно содержать не более 20 символов',
            'username.exists' => 'Пользователь с таким тегом не найден',
            'username.regex' => 'Поле "Тег" должно содержать только буквы, цифры и подчеркивание',
        ]);

        try {
            return response()->json($this->followingSystemService->getFollowingsList($request->username));
        } catch (UserNotFoundOrTimeIsOut $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
        }
    }

    public function getFollowersList(Request $request)
    {

        $request->validate([
            'username' => 'string|max:20|exists:profiles,username|regex:/^[a-zA-Z0-9_]+$/u',
        ], [
            'username.string' => 'Поле "Тег" должно быть строкой',
            'username.max' => 'Поле "Тег" должно содержать не более 20 символов',
            'username.exists' => 'Пользователь с таким тегом не найден',
            'username.regex' => 'Поле "Тег" должно содержать только буквы, цифры и подчеркивание',
        ]);

        try {
            return response()->json($this->followingSystemService->getFollowersList($request->username));
        } catch (UserNotFoundOrTimeIsOut $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
        }
    }
}

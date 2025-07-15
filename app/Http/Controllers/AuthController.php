<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\AuthService;
use App\Services\RecoveryPasswordService;
use App\Services\EmailVerificationService;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegistrationRequest;
use App\Http\Requests\Auth\PassRecoveryRequest;
use App\Http\Requests\Auth\PassResetRequest;
use App\Http\Requests\TokenRequest;
use App\Exceptions\UserNotFoundOrTimeIsOut;
use App\Exceptions\InvalidCredentialsException;
use App\Exceptions\UserAlreadyVerifiedException;
use App\Exceptions\UserNotVerifiedException;
use App\Exceptions\UserAlreadyExistsException;

class AuthController extends Controller
{

    public function __construct(
        AuthService $authService,
        RecoveryPasswordService $recoveryPasswordService,
        EmailVerificationService $emailVerificationService
    ) {
        $this->authService = $authService;
        $this->recoveryPasswordService = $recoveryPasswordService;
        $this->emailVerificationService = $emailVerificationService;
    }


    public function register(RegistrationRequest $request)
    {
        try {
            return response()->json($this->authService->register($request->all()), 200);
        } catch (UserAlreadyExistsException $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 400);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            return response()->json($this->authService->login($request->all()), 200);
        } catch (InvalidCredentialsException $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 400);
        }
    }

    public function logout()
    {
        return response()->json($this->authService->logout(), 200);
    }

    public function verifyToken(TokenRequest $request)
    {
        return response()->json($this->emailVerificationService->verifyToken($request->all()), 200);
    }

    public function verifyEmail(Request $request)
    {
        try {
            return response()->json($this->emailVerificationService->verifyEmail($request->only("code", "token")), 200);
        } catch (UserNotFoundOrTimeIsOut $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 400);
        } catch (UserAlreadyVerifiedException $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 400);
        } catch (InvalidCredentialsException $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 400);
        }
    }

    public function sendVerificationCode(TokenRequest $request)
    {
        try {
            return response()->json($this->emailVerificationService->sendVerificationCode($request->all()), 200);
        } catch (UserNotFoundOrTimeIsOut $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 400);
        } catch (UserAlreadyVerifiedException $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 400);
        }
    }

    public function recoveryPassword(PassRecoveryRequest $request)
    {
        try {
            return response()->json($this->recoveryPasswordService->sendRecoveryPasswordLink($request->input("email")), 200);
        } catch (UserNotFoundOrTimeIsOut $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 400);
        } catch (UserNotVerifiedException $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 400);
        }
    }

    public function resetPassword(PassResetRequest $request)
    {
        try {
            return response()->json($this->recoveryPasswordService->resetPassword($request->all()), 200);
        } catch (InvalidCredentialsException $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 400);
        } catch (UserNotFoundOrTimeIsOut $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 400);
        }
    }

    public function getSession()
    {
        $user = Auth::user();

        return response()->json([
            "user" => [
                ...($user ? $user->getUserData() : []),
                'profile_id' => $user ? $user->profile->id : null,
                'username' => $user ? $user->profile->username : null,
                'avatar' => $user ? $user->profile->avatar : null,
            ],
        ], 200);
    }
}

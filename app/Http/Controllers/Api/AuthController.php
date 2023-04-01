<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgetRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetRequest;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    # The api's endpoint for register
    public function register(RegisterRequest $request) 
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    # The api's endpoint for login
    public function login(LoginRequest $request) 
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'The provided email or password is incorrect'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));

    }

    # The api's endpoint for forgetpassword
    public function forgetPassword(ForgetRequest $request) 
    {

    }

    # The api's endpoint for resetPassword
    public function resetPassword(ResetRequest $request) 
    {
        
    }

    # The api's endpoint for emailVerification
    public function emailVerification(EmailVerificationRequest $request) 
    {

    }

    # The api's endpoint for logout
    public function logout(Request $request) 
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}

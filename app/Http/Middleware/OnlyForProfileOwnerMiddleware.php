<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Profile;

class OnlyForProfileOwnerMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $profile = Profile::where('username', $request->route('username'))->first();

        if ($profile->user_id !== $request->user()->id) {
            abort(403);
        }

        return $next($request);
    }
}

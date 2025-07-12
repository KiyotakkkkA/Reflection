<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Carbon\Carbon;

class CleanExpiredRegistrationsCommand extends Command
{
    protected $signature = 'app:clean-expired-registrations';

    protected $description = 'Clean expired registrations';

    public function handle()
    {
        $deleted = User::whereNull('email_verified_at')
            ->where('temp_token_expires_at', '<', Carbon::now())
            ->delete();

        $this->info("Удалено просроченных регистраций: " . $deleted);
    }
}

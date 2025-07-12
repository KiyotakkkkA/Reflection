<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Console\Commands\CleanExpiredRegistrationsCommand;
use Illuminate\Support\Facades\Schedule;

Schedule::command(CleanExpiredRegistrationsCommand::class)->hourly();

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

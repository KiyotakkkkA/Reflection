<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('telegram_link')->nullable();
            $table->string('github_link')->nullable();
            $table->string('vk_link')->nullable();
            $table->string('discord_link')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn('telegram_link');
            $table->dropColumn('github_link');
            $table->dropColumn('vk_link');
            $table->dropColumn('discord_link');
        });
    }
};

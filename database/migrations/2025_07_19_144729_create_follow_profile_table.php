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
        Schema::create('follow_profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_profile_id');
            $table->unsignedBigInteger('follower_profile_id');
            $table->timestamps();

            $table->unique(['user_profile_id', 'follower_profile_id']);
            $table->foreign('user_profile_id')->references('id')->on('profiles')->onDelete('cascade');
            $table->foreign('follower_profile_id')->references('id')->on('profiles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follow_profiles');
    }
};

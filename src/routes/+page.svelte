<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import type { User } from '@supabase/supabase-js';
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";

  let user: User | null = null;

  onMount(() => {
    // Subscribe to auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
      user = session?.user ?? null;
    });
  });
</script>

<div class="min-h-screen bg-background flex items-center justify-center p-4">
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle>Welcome to Tauri + Svelte + Supabase</CardTitle>
      <CardDescription>
        {#if user}
          Logged in as {user.email}
        {:else}
          Please sign in to continue
        {/if}
      </CardDescription>
    </CardHeader>
    <CardContent>
      {#if user}
        <div class="text-center">
          <Button variant="destructive" on:click={() => supabase.auth.signOut()}>
            Sign Out
          </Button>
        </div>
      {:else}
        <div class="space-y-4">
          <Button href="/auth/login" class="w-full">
            Sign In
          </Button>
          <Button href="/auth/signup" variant="outline" class="w-full">
            Create Account
          </Button>
        </div>
      {/if}
    </CardContent>
  </Card>
</div>

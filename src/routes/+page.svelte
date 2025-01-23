<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import type { User } from '@supabase/supabase-js';

  let user: User | null = null;

  onMount(() => {
    // Subscribe to auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
      user = session?.user ?? null;
    });
  });

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: 'your.email@example.com'
    });
    if (error) console.error('Error:', error.message);
    else console.log('Check your email for the login link!');
  }
</script>

<main class="container">
  <h1>Welcome to your Tauri + Svelte + Supabase App</h1>
  
  {#if user}
    <div>
      <p>Welcome {user.email}</p>
      <button on:click={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  {:else}
    <div>
      <p>Please sign in to continue</p>
      <button on:click={signInWithEmail}>
        Sign In with Magic Link
      </button>
    </div>
  {/if}
</main>

<style>
  .container {
    margin: 0 auto;
    padding: 2rem;
    max-width: 800px;
    text-align: center;
  }

  button {
    padding: 0.5rem 1rem;
    margin: 1rem 0;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>

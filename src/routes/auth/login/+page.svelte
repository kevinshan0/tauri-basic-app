<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { goto } from '$app/navigation';
  import { loginSchema, type LoginSchema } from '$lib/validations/auth';
  import { type SuperValidated, type Infer,superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';

  let { data } : { data: { form: SuperValidated<Infer<LoginSchema>> } } = $props();

  const form = superForm(data.form, {
    validators: zodClient(loginSchema),
  });

  const { form: formData, enhance } = form;
</script>

<div class="min-h-screen bg-background flex items-center justify-center p-4">
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle>Welcome Back</CardTitle>
      <CardDescription>
        Sign in to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form method="POST" use:enhance class="space-y-4">
        <Form.Field {form} name="email">
          <div class="space-y-2">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Email</Form.Label>
                <Input type="email" placeholder="Enter your email" {...props} bind:value={$formData.email}/>
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </div>
        </Form.Field>

        <Form.Field {form} name="password">
          <div class="space-y-2">
            <Form.Label>Password</Form.Label>
            <Form.Control>
              {#snippet children({ props })}
                <Input type="password" placeholder="Enter your password" {...props} bind:value={$formData.password}/>
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </div>
        </Form.Field>

        <Button type="submit" class="w-full">
          Sign In
        </Button>

        <p class="text-sm text-center text-muted-foreground">
          Don't have an account?
          <a href="/auth/signup" class="text-primary hover:underline">Sign Up</a>
        </p>
      </form>
    </CardContent>
  </Card>
</div> 
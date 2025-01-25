<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import * as Card from "$lib/components/ui/card";
  import { signupSchema, type SignupSchema } from '$lib/validations/auth';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';

  let { data } : { data: { form: SuperValidated<Infer<SignupSchema>> } } = $props();

  const form = superForm(data.form, {
    validators: zodClient(signupSchema),
  });

  const { form: formData, enhance } = form;
</script>

<div class="min-h-screen bg-background flex items-center justify-center p-4">
  <Card.Root class="w-full max-w-md">
    <Card.Header>
      <Card.Title>Create an Account</Card.Title>
      <Card.Description>
        Enter your details to create a new account
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <form method="POST" use:enhance class="space-y-4">
        <Form.Field {form} name="email">
          <div class="space-y-2">
            <Form.Label>Email</Form.Label>
            <Form.Control>
              {#snippet children({ props })}
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

        <Form.Field {form} name="confirmPassword">
          <div class="space-y-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control>
              {#snippet children({ props })}
                <Input type="password" placeholder="Confirm your password" {...props} bind:value={$formData.confirmPassword}/>
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </div>
        </Form.Field>

        <Form.Button class="w-full">
          Sign Up
        </Form.Button>

        <p class="text-sm text-center text-muted-foreground">
          Already have an account?
          <a href="/auth/login" class="text-primary hover:underline">Login</a>
        </p>
      </form>
    </Card.Content>
  </Card.Root>
</div> 
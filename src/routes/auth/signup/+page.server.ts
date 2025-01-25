import { signupSchema } from '$lib/validations/auth';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(signupSchema));
  return { form };
}; 

export const actions: Actions = {
    default: async (event) => {
      const form = await superValidate(event, zod(signupSchema));
      
      if (!form.valid) {
        return fail(400, { form });
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email: form.data.email,
        password: form.data.password,
        options: {
          emailRedirectTo: '/',
        },
      });

      if (signUpError) {
        return fail(400, { form, error: signUpError.message });
      }
      return { form };
    },
  };
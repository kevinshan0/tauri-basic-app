import { loginSchema } from '$lib/validations/auth';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(loginSchema));
  return { form };
};

export const actions: Actions = {
    default: async (event) => {
      const form = await superValidate(event, zod(loginSchema));

      if (!form.valid) {
        return fail(400, { form });
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.data.email,
        password: form.data.password,
      });

      if (signInError) {
        return fail(400, { form, error: signInError.message });
      }
      
      return { form };
    },
  };
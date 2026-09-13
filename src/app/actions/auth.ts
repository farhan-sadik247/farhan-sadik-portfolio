'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_-]+$/, 'Invalid username format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
})

export async function signup(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const validated = signupSchema.safeParse(data)

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Failed to sign up.'
    }
  }

  const { fullName, username, password } = validated.data
  const email = `${username}@auth.farhansadik.me`

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username,
      },
    },
  })

  if (error) {
    return { message: error.message }
  }

  redirect('/shortener')
}

export async function login(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const validated = loginSchema.safeParse(data)

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Failed to log in.'
    }
  }

  const { username, password } = validated.data
  const email = `${username}@auth.farhansadik.me`

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { message: 'Invalid username or password.' }
  }

  redirect('/shortener')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function getUser() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (data.user) {
    return { username: data.user.user_metadata.username as string }
  }
  return null
}

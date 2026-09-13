import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { generateShortCode } from '@/utils/short-code'

const shortenSchema = z.object({
  url: z.string().url().max(2048, "URL is too long").refine(
    (url) => url.startsWith('http://') || url.startsWith('https://'),
    { message: "Only HTTP and HTTPS URLs are allowed" }
  ),
  alias: z.string()
    .regex(/^[a-zA-Z0-9_-]+$/, "Alias can only contain letters, numbers, hyphens, and underscores")
    .min(3, "Alias must be at least 3 characters")
    .max(30, "Alias must be at most 30 characters")
    .optional()
    .or(z.literal('')),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = shortenSchema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid URL', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const { url, alias } = parsed.data
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 })
    }

    if (alias) {
      const { error } = await supabase
        .from('short_links')
        .insert({
          short_code: alias,
          original_url: url,
          user_id: user.id
        })

      if (!error) {
        const origin = new URL(request.url).origin
        const shortUrl = `${origin}/${alias}`
        return NextResponse.json({
          shortCode: alias,
          shortUrl,
          originalUrl: url
        })
      }

      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Custom alias is already taken. Please choose another one.' },
          { status: 400 }
        )
      }

      console.error('Database error during URL shortening with alias:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    const MAX_RETRIES = 5
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const shortCode = generateShortCode()

      const { error } = await supabase
        .from('short_links')
        .insert({
          short_code: shortCode,
          original_url: url,
          user_id: user.id
        })

      if (!error) {
        // Construct the full short URL using the request URL's origin
        const origin = new URL(request.url).origin
        const shortUrl = `${origin}/${shortCode}`

        return NextResponse.json({
          shortCode,
          shortUrl,
          originalUrl: url
        })
      }

      // 23505 is the PostgreSQL error code for unique_violation
      if (error.code !== '23505') {
        console.error('Database error during URL shortening:', error)
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        )
      }
      // If it is 23505, it will retry in the next loop iteration
    }

    // Exceeded max retries
    return NextResponse.json(
      { error: 'Failed to generate a unique short code after multiple attempts' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Unexpected error during URL shortening:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

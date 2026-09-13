import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  props: { params: Promise<{ shortCode: string }> }
) {
  try {
    const params = await props.params
    const shortCode = params.shortCode

    if (!shortCode || typeof shortCode !== 'string') {
      return NextResponse.json({ error: 'Invalid short code' }, { status: 400 })
    }

    const supabase = await createClient()

    // Find the original URL
    const { data, error } = await supabase
      .from('short_links')
      .select('original_url')
      .eq('short_code', shortCode)
      .single()

    if (error || !data?.original_url) {
      // Return a proper 404 response if shortlink doesn't exist.
      // A more user-friendly 404 page could be rendered here instead of JSON
      // but for a strict redirect endpoint, this is sufficient.
      return new NextResponse('Short link not found', { status: 404 })
    }

    // Increment click count asynchronously using RPC
    // Await it to ensure it runs before serverless function exits, 
    // but catch errors so the redirect still happens if stats fail.
    try {
      await supabase.rpc('increment_click_count', { p_short_code: shortCode })
    } catch (err) {
      console.error('Failed to increment click count:', err)
    }

    // Redirect to the original URL
    return NextResponse.redirect(data.original_url, { status: 302 })
  } catch (err) {
    console.error('Error handling redirect:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

'use client'

import { useState } from 'react'
import { Link2, Copy, Check, AlertCircle, Loader2 } from 'lucide-react'

export function UrlShortener() {
  const [url, setUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ shortUrl: string; originalUrl: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)
    setCopied(false)

    if (!url) {
      setError('Please enter a URL')
      return
    }

    try {
      // Basic client-side validation
      new URL(url)
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, alias: alias.trim() || undefined }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to shorten URL')
      }

      setResult({
        shortUrl: data.shortUrl,
        originalUrl: data.originalUrl,
      })
      setUrl('')
      setAlias('') // Clear alias on success
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (result?.shortUrl) {
      try {
        await navigator.clipboard.writeText(result.shortUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy', err)
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <Link2 className="w-6 h-6 text-blue-500" />
          Shorten Your Link
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Paste your long URL below to get a short, shareable link.
        </p>
      </div>

      <form onSubmit={handleShorten} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very/long/url"
              className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 dark:text-white placeholder-gray-400"
              disabled={loading}
              required
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div>
          <input
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Custom alias (optional)"
            className="w-full pl-4 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 dark:text-white placeholder-gray-400"
            disabled={loading}
            pattern="[a-zA-Z0-9_-]+"
            title="Only letters, numbers, hyphens, and underscores are allowed"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !url}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Shortening...
            </>
          ) : (
            'Shorten URL'
          )}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl animate-in fade-in slide-in-from-bottom-2">
          <p className="text-sm text-green-800 dark:text-green-400 font-medium mb-2">
            Your short URL is ready!
          </p>
          <div className="flex items-center justify-between gap-3 bg-white dark:bg-gray-950 p-3 rounded-lg border border-green-100 dark:border-green-900/50">
            <a
              href={result.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-medium truncate hover:underline"
            >
              {result.shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors flex-shrink-0"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 truncate">
            Redirects to: {result.originalUrl}
          </p>
        </div>
      )}
    </div>
  )
}

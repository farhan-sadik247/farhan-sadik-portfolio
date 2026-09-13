import { UrlShortener } from '@/components/common/UrlShortener'
import { createClient } from '@/lib/supabase/server'
import { Link2, ExternalLink, BarChart3, Clock, LogOut } from 'lucide-react'
import { logout } from '@/app/actions/auth'

export const metadata = {
  title: 'URL Shortener | My Portfolio',
  description: 'Shorten your long URLs easily.',
}

interface ShortLink {
  id: number
  short_code: string
  original_url: string
  click_count: number
  created_at: string
}

export default async function ShortenerPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let userLinks: ShortLink[] = []
  if (user) {
    const { data } = await supabase
      .from('short_links')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (data) {
      userLinks = data
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-start p-4 pt-32 pb-12 relative">
      {user && (
        <div className="absolute top-24 right-4 md:right-8 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Hi, {user.user_metadata.username}
          </span>
          <form action={logout}>
            <button 
              type="submit"
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </form>
        </div>
      )}

      <div className="w-full max-w-4xl text-center mb-8 mt-12 md:mt-0">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
          Free URL Shortener
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Create short, memorable links in seconds.
        </p>
      </div>
      
      <div className="w-full mb-12">
        <UrlShortener />
      </div>

      {user && (
        <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Link2 className="w-6 h-6 text-blue-500" />
              Your Short Links
            </h2>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {userLinks.length} links created
            </div>
          </div>

          {userLinks.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">You haven&apos;t created any links yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userLinks.map((link) => (
                <div key={link.id} className="group flex flex-col bg-gray-50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800 border border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-500/50 p-5 rounded-xl transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-start justify-between mb-3">
                    <a 
                      href={`/${link.short_code}`}
                      target="_blank"
                      className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-lg"
                    >
                      /{link.short_code}
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                    <div className="flex items-center gap-1 text-sm bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                      <BarChart3 className="w-3 h-3" />
                      {link.click_count}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-4" title={link.original_url}>
                    {link.original_url}
                  </p>
                  
                  <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700/50 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(link.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

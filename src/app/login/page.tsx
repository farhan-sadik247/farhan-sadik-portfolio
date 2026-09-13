'use client'

import { useActionState, useState } from 'react'
import { login, signup } from '@/app/actions/auth'
import { AlertCircle, Loader2, Check, X, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AuthPage() {
  const [isFlipped, setIsFlipped] = useState(false)

  // Login State
  const [loginState, loginAction, isLoginPending] = useActionState(login, null)

  // Signup State
  const [signupState, signupAction, isSignupPending] = useActionState(signup, null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Visibility state
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Password strength logic
  const hasLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  
  const score = [hasLength, hasUppercase, hasLowercase, hasNumber].filter(Boolean).length
  
  let strengthLabel = 'Weak'
  let strengthColor = 'bg-red-500'
  let strengthTextColor = 'text-red-500'
  if (score === 4) {
    strengthLabel = 'Strong'
    strengthColor = 'bg-green-500'
    strengthTextColor = 'text-green-500'
  } else if (score >= 2) {
    strengthLabel = 'Medium'
    strengthColor = 'bg-yellow-500'
    strengthTextColor = 'text-yellow-500'
  }
  
  const passwordsMatch = password && confirmPassword && password === confirmPassword

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 overflow-hidden perspective-[2000px]">
      <motion.div
        className="relative w-full max-w-md h-[650px]"
        initial={false}
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 60, damping: 15 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front side: Login */}
        <div 
          className="absolute inset-0 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-8 md:p-10 flex flex-col justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Log in to your URL shortener account</p>
          </div>

          <form action={loginAction} className="space-y-5">
            {loginState?.message && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {loginState.message}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Username</label>
              <input
                name="username"
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-all shadow-sm"
              />
              {loginState?.errors?.username && <p className="text-red-500 text-xs mt-1.5">{loginState.errors.username[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showLoginPassword ? "text" : "password"}
                  required
                  className="w-full px-4 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                >
                  {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {loginState?.errors?.password && <p className="text-red-500 text-xs mt-1.5">{loginState.errors.password[0]}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoginPending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-8"
            >
              {isLoginPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <button 
              onClick={(e) => { e.preventDefault(); setIsFlipped(true); }} 
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Back side: Signup */}
        <div 
          className="absolute inset-0 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-8 flex flex-col justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1 tracking-tight">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Join to manage your short links</p>
          </div>

          <form action={signupAction} className="space-y-4">
            {signupState?.message && (
              <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {signupState.message}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                name="fullName"
                type="text"
                required
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white text-sm transition-all"
              />
              {signupState?.errors?.fullName && <p className="text-red-500 text-xs mt-1">{signupState.errors.fullName[0]}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <input
                name="username"
                type="text"
                required
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white text-sm transition-all"
              />
              {signupState?.errors?.username && <p className="text-red-500 text-xs mt-1">{signupState.errors.username[0]}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showSignupPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                >
                  {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-1.5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-500">Strength:</span>
                    <span className={`text-[10px] font-medium ${strengthTextColor}`}>{strengthLabel}</span>
                  </div>
                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex gap-0.5">
                    <div className={`h-full ${score >= 1 ? strengthColor : 'bg-transparent'} transition-colors duration-300`} style={{ width: '25%' }}></div>
                    <div className={`h-full ${score >= 2 ? strengthColor : 'bg-transparent'} transition-colors duration-300`} style={{ width: '25%' }}></div>
                    <div className={`h-full ${score >= 3 ? strengthColor : 'bg-transparent'} transition-colors duration-300`} style={{ width: '25%' }}></div>
                    <div className={`h-full ${score >= 4 ? strengthColor : 'bg-transparent'} transition-colors duration-300`} style={{ width: '25%' }}></div>
                  </div>
                </div>
              )}
              {signupState?.errors?.password && <p className="text-red-500 text-xs mt-1">{signupState.errors.password[0]}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 pr-16 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white text-sm transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {confirmPassword && (
                    <div className="border-l border-gray-200 dark:border-gray-700 pl-1.5 flex items-center">
                      {passwordsMatch ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {signupState?.errors?.confirmPassword && <p className="text-red-500 text-xs mt-1">{signupState.errors.confirmPassword[0]}</p>}
            </div>

            <button
              type="submit"
              disabled={isSignupPending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              {isSignupPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign Up'}
            </button>
          </form>

          <p className="text-center mt-6 text-xs text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button 
              onClick={(e) => { e.preventDefault(); setIsFlipped(false); }} 
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

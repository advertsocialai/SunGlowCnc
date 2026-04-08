'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-black text-red-500 mb-4">!</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Something went wrong</h1>
        <p className="text-slate-500 mb-8">
          An unexpected error occurred. Please try again or contact support if the issue persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  )
}

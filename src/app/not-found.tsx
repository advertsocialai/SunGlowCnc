import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-orange-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Page Not Found</h1>
        <p className="text-slate-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

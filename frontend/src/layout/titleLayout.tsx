import { useEffect } from "react"

interface LayoutProps {
  children: React.ReactNode
  pageTitle?: string
}

export function AppLayout({ children, pageTitle }: LayoutProps) {
  useEffect(() => {
    // Si la página define un título, úsalo
    if (pageTitle) {
      document.title = pageTitle
    } else {
      // Si no, usa el título por defecto
      document.title = "Mi App"
    }

    // Cleanup: al desmontar, restaurar título por defecto
    return () => {
      document.title = "Mi App"
    }
  }, [pageTitle])

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Aquí podrías tener tu navbar, sidebar, etc */}
      <main className="pb-16">{children}</main>

      {/* Footer minimalista y personalizable */}
      <footer className="w-full border-t border-zinc-800 bg-black/80 text-zinc-500 py-6 mt-auto">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center justify-center text-sm">
          <p>© {new Date().getFullYear()} English Goal. All rights reserved.</p>
          <p className="mt-1">
            Built for consistent learning.{" "}
            <a href="#" className="text-zinc-400 hover:text-rose-500 transition-colors">
              Edit here
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
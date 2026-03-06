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
    <div className="min-h-screen bg-gray-50">
      {/* Aquí podrías tener tu navbar, sidebar, etc */}
      <main>{children}</main>
    </div>
  )
}
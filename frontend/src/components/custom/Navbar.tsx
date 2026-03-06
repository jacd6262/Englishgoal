// components/Navbar.tsx
import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="w-full bg-black text-white px-6 pl-81 py-3 flex items-center justify-between">
      {/* Menú principal */}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-6">
          <NavigationMenuItem>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/cronometro" className="hover:text-gray-300">Cronómetro</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/historial" className="hover:text-gray-300">Historial</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Usuario con dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-gray-800">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/user.png" alt="Usuario" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span>Usuario</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/perfil">Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/configuraciones">Configuraciones</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <Link to="/logout">Salir</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
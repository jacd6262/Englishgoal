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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-black backdrop-blur-none">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 font-bold text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]">
            EG
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            English<span className="text-rose-500">Goal</span>
          </span>
        </div>

        {/* Navigation - Desktop */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
              <Link to="/" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/10 data-[state=open]:bg-white/10">
                Dashboard
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/cronometro" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/10 data-[state=open]:bg-white/10">
                Timer
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/historial" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/10 data-[state=open]:bg-white/10">
                History
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 rounded-full px-2 hover:bg-white/10 gap-2">
                <Avatar className="h-7 w-7 border border-rose-900/50">
                  <AvatarImage src="/user.png" alt="Usuario" />
                  <AvatarFallback className="bg-rose-950 text-rose-200">U</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block text-sm font-medium text-gray-200">
                  Usuario
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-zinc-800 text-zinc-300">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">Usuario</p>
                  <p className="text-xs leading-none text-zinc-500">
                    user@englishgoal.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                <Link to="/perfil" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                <Link to="/configuraciones" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="text-rose-500 focus:bg-rose-500/10 focus:text-rose-400 cursor-pointer">
                <Link to="/logout" className="w-full font-medium">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
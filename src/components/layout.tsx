"use client"

import type React from "react"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChefHat, BookOpen, Calendar, Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { AppSidebar } from "./app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { href: "/", icon: ChefHat, label: "Discover" },
    { href: "/journal", icon: BookOpen, label: "Journal" },
    { href: "/planner", icon: Calendar, label: "Planner" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="font-serif font-bold text-xl bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent">
              Fridge Feast
            </span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 pt-20">
              <AppSidebar />
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 fixed left-0 top-0 h-screen border-r border-indigo-100 bg-white/50 backdrop-blur-md overflow-y-auto">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="font-serif font-bold text-2xl bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent">
                Fridge Feast
              </span>
            </Link>
            <AppSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-80 pt-16 lg:pt-0">{children}</main>

        {/* Bottom Navigation - Mobile */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-indigo-100">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    isActive ? "text-primary bg-indigo-50" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}

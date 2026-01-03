"use client"

import * as React from "react"
import { ChefHat, Calendar, BookMarked, Home, Moon, Sun, Plus, X } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const moodFilters = [
  { label: "Quick", emoji: "⚡", value: "quick" },
  { label: "Healthy", emoji: "🥗", value: "healthy" },
  { label: "Comfort", emoji: "🫕", value: "comfort" },
  { label: "Spicy", emoji: "🔥", value: "spicy" },
  { label: "Vegetarian", emoji: "🌱", value: "vegetarian" },
  { label: "Sweet", emoji: "🍰", value: "sweet" },
]

interface AppSidebarProps {
  ingredients: string[]
  onIngredientsChange: (ingredients: string[]) => void
  selectedMoods: string[]
  onMoodsChange: (moods: string[]) => void
}

export function AppSidebar({ ingredients, onIngredientsChange, selectedMoods, onMoodsChange }: AppSidebarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [inputValue, setInputValue] = React.useState("")

  const addIngredient = () => {
    if (inputValue.trim()) {
      onIngredientsChange([...ingredients, inputValue.trim()])
      setInputValue("")
    }
  }

  const removeIngredient = (index: number) => {
    onIngredientsChange(ingredients.filter((_, i) => i !== index))
  }

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      onMoodsChange(selectedMoods.filter((m) => m !== mood))
    } else {
      onMoodsChange([...selectedMoods, mood])
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg">
            <ChefHat className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold">Fridge Feast</span>
            <span className="text-xs text-muted-foreground">Cook smarter</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <div className="space-y-6 p-4">
            {/* Navigation */}
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Navigate</h3>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/"}>
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/journal"}>
                    <Link href="/journal">
                      <BookMarked className="h-4 w-4" />
                      <span>Saved Recipes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/planner"}>
                    <Link href="/planner">
                      <Calendar className="h-4 w-4" />
                      <span>Meal Planner</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>

            {/* Ingredients Input */}
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Ingredients
              </h3>
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addIngredient()}
                  placeholder="Add ingredient..."
                  className="flex-1"
                />
                <Button
                  size="icon"
                  className="bg-gradient-to-r from-primary to-secondary shadow-md transition-all hover:scale-105"
                  onClick={addIngredient}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {ingredients.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="gap-1 border border-primary/20 pl-2 pr-1 shadow-sm"
                    >
                      {ingredient}
                      <button
                        onClick={() => removeIngredient(index)}
                        className="ml-1 rounded-sm transition-colors hover:bg-destructive/20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Mood Filters */}
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mood</h3>
              <div className="flex flex-wrap gap-2">
                {moodFilters.map((mood) => (
                  <Button
                    key={mood.value}
                    variant={selectedMoods.includes(mood.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleMood(mood.value)}
                    className={cn(
                      "gap-1 transition-all",
                      selectedMoods.includes(mood.value) &&
                        "bg-gradient-to-r from-primary to-secondary shadow-md hover:scale-105",
                    )}
                  >
                    <span>{mood.emoji}</span>
                    <span>{mood.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full justify-start"
        >
          {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          Toggle theme
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

"use client"

import * as React from "react"
import { Plus, X, Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

const moodFilters = [
  { label: "Quick", emoji: "⚡", value: "quick" },
  { label: "Healthy", emoji: "🥗", value: "healthy" },
  { label: "Comfort", emoji: "🫕", value: "comfort" },
  { label: "Spicy", emoji: "🔥", value: "spicy" },
  { label: "Vegetarian", emoji: "🌱", value: "vegetarian" },
  { label: "Sweet", emoji: "🍰", value: "sweet" },
]

interface AppSidebarProps {
  ingredients?: string[]
  onIngredientsChange?: (ingredients: string[]) => void
  selectedMoods?: string[]
  onMoodsChange?: (moods: string[]) => void
}

export function AppSidebar({
  ingredients = [],
  onIngredientsChange = () => {},
  selectedMoods = [],
  onMoodsChange = () => {},
}: AppSidebarProps) {
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
    <div className="space-y-6">
      {/* Ingredients Input */}
      <div>
        <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">Your Ingredients</h3>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addIngredient()}
            placeholder="Add ingredient..."
            className="flex-1 border-indigo-200 focus-visible:ring-indigo-500"
          />
          <Button
            size="icon"
            className="bg-gradient-to-r from-indigo-600 to-rose-600 shadow-md transition-all hover:scale-105 hover:shadow-lg"
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
                className="gap-1 border border-indigo-200 bg-indigo-50 pl-3 pr-1 text-indigo-900 shadow-sm"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(index)}
                  className="ml-1 rounded-sm transition-colors hover:bg-rose-100"
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
        <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">Mood</h3>
        <div className="flex flex-wrap gap-2">
          {moodFilters.map((mood) => (
            <Button
              key={mood.value}
              variant={selectedMoods.includes(mood.value) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleMood(mood.value)}
              className={cn(
                "gap-1.5 border-indigo-200 transition-all hover:scale-105",
                selectedMoods.includes(mood.value) &&
                  "bg-gradient-to-r from-indigo-600 to-rose-600 shadow-md hover:shadow-lg",
              )}
            >
              <span>{mood.emoji}</span>
              <span className="font-medium">{mood.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="border-t border-indigo-100 pt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full justify-start border-indigo-200"
        >
          {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          <span className="font-medium">Toggle theme</span>
        </Button>
      </div>
    </div>
  )
}

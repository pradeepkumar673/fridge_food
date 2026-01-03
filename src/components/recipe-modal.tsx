"use client"

import { useState, useEffect, useRef } from "react"
import { X, Clock, Users, Flame, ChefHat, Check, ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ScrollArea } from "./ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Recipe } from "./recipe-card"
import gsap from "gsap"

interface RecipeModalProps {
  recipe: Recipe & {
    ingredients: { name: string; amount: string; available: boolean }[]
    steps: string[]
    nutrition: { label: string; value: string }[]
  }
  isOpen: boolean
  onClose: () => void
  userIngredients: string[]
}

export function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
  const [servings, setServings] = useState(recipe.servings)
  const [spiceLevel, setSpiceLevel] = useState(1)
  const [showCustomization, setShowCustomization] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, y: 50, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.5)" },
      )
    }
  }, [isOpen])

  if (!isOpen) return null

  const missingIngredients = recipe.ingredients.filter((ing) => !ing.available)

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        scale: 0.9,
        y: 50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.2,
        delay: 0.2,
        ease: "power2.in",
        onComplete: onClose,
      })
    } else {
      onClose()
    }
  }

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={handleClose} />
      <div
        ref={contentRef}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <ScrollArea className="max-h-[90vh]">
          {/* Header Image */}
          <div className="relative aspect-[21/9] w-full">
            <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="mb-2 font-serif text-4xl font-bold text-white text-balance">{recipe.title}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-white/90">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{recipe.cookTime} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="h-4 w-4" />
                  <span className="font-medium">{recipe.calories} cal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-indigo-50 border border-indigo-100">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              </TabsList>

              <TabsContent value="ingredients" className="mt-4 space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-3 rounded-lg p-3 transition-all hover:scale-[1.02]",
                      ingredient.available ? "bg-indigo-50 border border-indigo-100 shadow-sm" : "bg-gray-100",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full shadow-sm",
                        ingredient.available
                          ? "bg-gradient-to-r from-indigo-600 to-rose-600 text-white"
                          : "bg-gray-300",
                      )}
                    >
                      {ingredient.available && <Check className="h-4 w-4" />}
                    </div>
                    <span className="flex-1 font-medium">{ingredient.name}</span>
                    <span className="text-sm text-muted-foreground">{ingredient.amount}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="steps" className="mt-4 space-y-4">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-rose-600 text-sm font-bold text-white shadow-md">
                      {index + 1}
                    </div>
                    <p className="flex-1 pt-1.5 leading-relaxed">{step}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="nutrition" className="mt-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {recipe.nutrition.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-indigo-50 p-4 border border-indigo-100 shadow-sm"
                    >
                      <span className="font-semibold">{item.label}</span>
                      <span className="text-lg font-bold text-indigo-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {!showCustomization ? (
              <Button
                size="lg"
                className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-rose-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                onClick={() => setShowCustomization(true)}
              >
                <ChefHat className="mr-2 h-5 w-5" />
                Ready to Cook?
              </Button>
            ) : (
              <div className="mt-6 space-y-4 rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-rose-50 p-5 shadow-lg">
                <h3 className="font-serif text-lg font-bold">Customize Your Recipe</h3>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Servings: {servings}</label>
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      className="transition-all hover:scale-110 bg-transparent border-indigo-200"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 h-2 bg-indigo-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-rose-600"
                        style={{ width: `${(servings / 10) * 100}%` }}
                      />
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="transition-all hover:scale-110 bg-transparent border-indigo-200"
                      onClick={() => setServings(Math.min(10, servings + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {missingIngredients.length > 0 && (
                  <Button
                    variant="outline"
                    className="w-full border-indigo-300 bg-white transition-all hover:scale-105"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add {missingIngredients.length} Missing Items to Cart
                  </Button>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

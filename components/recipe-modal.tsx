"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X, Clock, Users, Flame, ChefHat, Check, ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
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

export function RecipeModal({ recipe, isOpen, onClose, userIngredients }: RecipeModalProps) {
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
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-2xl"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 rounded-full bg-background/90 backdrop-blur-sm transition-all hover:scale-110 hover:bg-background"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="max-h-[90vh] overflow-y-auto">
          {/* Header Image */}
          <div className="relative aspect-[21/9] w-full">
            <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="font-display mb-2 text-4xl font-bold text-white text-balance">{recipe.title}</h2>
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
              <TabsList className="grid w-full grid-cols-3">
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
                      ingredient.available ? "bg-primary/10 shadow-sm" : "bg-muted",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full shadow-sm",
                        ingredient.available
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                          : "bg-muted-foreground/20",
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
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-primary-foreground shadow-md">
                      {index + 1}
                    </div>
                    <p className="flex-1 pt-1.5 leading-relaxed">{step}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="nutrition" className="mt-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {recipe.nutrition.map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg bg-muted p-4 shadow-sm">
                      <span className="font-semibold">{item.label}</span>
                      <span className="text-lg font-bold text-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {!showCustomization ? (
              <Button
                size="lg"
                className="mt-6 w-full bg-gradient-to-r from-primary to-secondary shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                onClick={() => setShowCustomization(true)}
              >
                <ChefHat className="mr-2 h-5 w-5" />
                Ready to Cook?
              </Button>
            ) : (
              <div className="mt-6 space-y-4 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 p-5 shadow-lg">
                <h3 className="font-display text-lg font-bold">Customize Your Recipe</h3>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Servings: {servings}</label>
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      className="transition-all hover:scale-110 bg-transparent"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Slider
                      value={[servings]}
                      onValueChange={([v]) => setServings(v)}
                      min={1}
                      max={10}
                      step={1}
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="transition-all hover:scale-110 bg-transparent"
                      onClick={() => setServings(Math.min(10, servings + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Spice Level: {["Mild", "Medium", "Hot"][spiceLevel]}</label>
                  <Slider value={[spiceLevel]} onValueChange={([v]) => setSpiceLevel(v)} min={0} max={2} step={1} />
                </div>

                {missingIngredients.length > 0 && (
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 bg-background/50 transition-all hover:scale-105"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add {missingIngredients.length} Missing Items to Cart
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

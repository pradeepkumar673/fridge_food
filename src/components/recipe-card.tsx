"use client"

import { useState, useRef, useEffect } from "react"
import { Clock, Users, Flame, TrendingUp } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"
import gsap from "gsap"

export interface Recipe {
  id: number
  title: string
  image: string
  cookTime: number
  servings: number
  calories: number
  matchPercentage: number
  difficulty?: string
}

interface RecipeCardProps {
  recipe: Recipe
  onClick: () => void
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return

    if (isHovered) {
      gsap.to(cardRef.current, {
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)",
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      })
    } else {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      })
    }
  }, [isHovered])

  return (
    <Card
      ref={cardRef}
      className="group cursor-pointer overflow-hidden border-2 border-indigo-100 bg-white transition-colors hover:border-indigo-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          ref={imageRef}
          src={recipe.image || "/placeholder.svg?height=400&width=600"}
          alt={recipe.title}
          className="h-full w-full object-cover"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100",
          )}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-serif text-base font-semibold text-white">View Recipe</p>
          </div>
        </div>
        <Badge className="absolute right-3 top-3 bg-gradient-to-r from-indigo-600 to-rose-600 font-semibold shadow-lg">
          <TrendingUp className="mr-1 h-3 w-3" />
          {recipe.matchPercentage}%
        </Badge>
      </div>
      <CardContent className="p-5">
        <h3 className="mb-4 line-clamp-2 font-serif text-xl font-bold leading-tight text-foreground">{recipe.title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-indigo-600" />
            <span className="font-medium">{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-indigo-600" />
            <span className="font-medium">{recipe.servings}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-rose-600" />
            <span className="font-medium">{recipe.calories} cal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

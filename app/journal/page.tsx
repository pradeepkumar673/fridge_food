"use client"

import { useState, useEffect, useRef } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Camera } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const savedRecipes = [
  {
    id: 1,
    title: "Creamy Tomato Basil Pasta",
    image: "/creamy-tomato-pasta.jpg",
    rating: 5,
    notes: "Added extra garlic - absolutely delicious! Family loved it.",
    userPhoto: null,
  },
  {
    id: 2,
    title: "Grilled Chicken Caesar Salad",
    image: "/chicken-caesar-salad.png",
    rating: 4,
    notes: "Great for meal prep. Made dressing from scratch.",
    userPhoto: "/homemade-caesar-salad.jpg",
  },
  {
    id: 3,
    title: "Healthy Buddha Bowl",
    image: "/vibrant-buddha-bowl.png",
    rating: 5,
    notes: "",
    userPhoto: null,
  },
]

export default function JournalPage() {
  const [ingredients, setIngredients] = useState<string[]>(["Tomatoes", "Chicken", "Basil"])
  const [selectedMoods, setSelectedMoods] = useState<string[]>(["quick"])
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })

      gsap.fromTo(
        ".journal-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".journal-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          ingredients={ingredients}
          onIngredientsChange={setIngredients}
          selectedMoods={selectedMoods}
          onMoodsChange={setSelectedMoods}
        />
        <main className="flex-1">
          <div className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm lg:hidden">
            <SidebarTrigger />
            <h1 className="font-display text-lg font-semibold">Recipe Journal</h1>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-12">
            <div ref={headerRef} className="mb-12">
              <h1 className="font-display mb-3 text-5xl font-bold">Recipe Journal</h1>
              <p className="text-xl text-muted-foreground">Track your cooking adventures and remember what worked</p>
            </div>

            <div className="journal-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="journal-card group overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={recipe.userPhoto || recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-display mb-3 text-xl font-bold">{recipe.title}</h3>

                    <div className="mb-3 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} className="transition-all hover:scale-125">
                          <Star
                            className={cn(
                              "h-5 w-5 transition-colors",
                              star <= recipe.rating ? "fill-accent text-accent" : "text-muted-foreground",
                            )}
                          />
                        </button>
                      ))}
                    </div>

                    {recipe.notes && (
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">{recipe.notes}</p>
                    )}

                    {!recipe.userPhoto && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full transition-all hover:scale-105 hover:border-primary/50 bg-transparent"
                        onClick={() => setSelectedRecipeId(recipe.id)}
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Add Photo
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

"use client"

import { useState } from "react"
import { Heart, Clock, Users, Star } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

const savedRecipes = [
  {
    id: 1,
    title: "Creamy Tomato Basil Pasta",
    image: "/creamy-tomato-pasta.jpg",
    cookTime: 25,
    servings: 4,
    rating: 5,
    notes: "Perfect for date night! Added extra garlic.",
    cookedCount: 3,
  },
  {
    id: 2,
    title: "Healthy Buddha Bowl",
    image: "/vibrant-buddha-bowl.png",
    cookTime: 35,
    servings: 2,
    rating: 4,
    notes: "Great for meal prep. Very filling.",
    cookedCount: 5,
  },
]

export default function JournalPage() {
  const [filter, setFilter] = useState("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mb-3 font-serif text-5xl font-bold text-foreground">Recipe Journal</h1>
          <p className="text-lg text-muted-foreground">Your culinary collection and cooking memories</p>
        </div>

        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-white border border-indigo-100">
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="cooked">Cooked</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="group cursor-pointer overflow-hidden border-2 border-indigo-100 bg-white transition-all hover:border-indigo-300 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                    <Badge className="absolute right-3 top-3 bg-gradient-to-r from-indigo-600 to-rose-600">
                      <Heart className="mr-1 h-3 w-3" fill="currentColor" />
                      Saved
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="mb-3 line-clamp-2 font-serif text-xl font-bold leading-tight">{recipe.title}</h3>
                    <div className="mb-3 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < recipe.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-indigo-600" />
                        <span>{recipe.cookTime} min</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-indigo-600" />
                        <span>{recipe.servings}</span>
                      </div>
                    </div>
                    {recipe.notes && (
                      <p className="mt-3 text-sm italic text-muted-foreground line-clamp-2">{recipe.notes}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cooked" className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedRecipes
                .filter((r) => r.cookedCount > 0)
                .map((recipe) => (
                  <Card
                    key={recipe.id}
                    className="group cursor-pointer overflow-hidden border-2 border-indigo-100 bg-white transition-all hover:border-indigo-300 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                      <Badge className="absolute right-3 top-3 bg-gradient-to-r from-indigo-600 to-rose-600">
                        Cooked {recipe.cookedCount}x
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="mb-3 line-clamp-2 font-serif text-xl font-bold leading-tight">{recipe.title}</h3>
                      <Button size="sm" className="w-full bg-gradient-to-r from-indigo-600 to-rose-600">
                        Cook Again
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedRecipes
                .filter((r) => r.rating === 5)
                .map((recipe) => (
                  <Card
                    key={recipe.id}
                    className="group cursor-pointer overflow-hidden border-2 border-indigo-100 bg-white transition-all hover:border-indigo-300 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                      <Badge className="absolute right-3 top-3 bg-gradient-to-r from-amber-400 to-amber-600">
                        <Star className="mr-1 h-3 w-3" fill="currentColor" />
                        Favorite
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="mb-3 line-clamp-2 font-serif text-xl font-bold leading-tight">{recipe.title}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
